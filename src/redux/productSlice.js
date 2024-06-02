import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../components/shared/helper/fetch-wrapper.js';

// create slice

const name = 'products';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// implementation

function createInitialState() {
    return {
        list: null,
        item: null,
        setUpdate
    }
    
}

function setUpdate(state, action){
    state.item = {value : action.payload}
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/products`;

    return {
        create: create(),
        getAll: getAll(),
        getById: getById(),
        update: update(),
        delete: _delete()
    };

    function create() {
        return createAsyncThunk(
            `${name}/create`,
            async (product) => await fetchWrapper.post(`${baseUrl}/create`, product)
        );
    }

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }

    function getById() {
        return createAsyncThunk(
            `${name}/getById`,
            async (id) => await fetchWrapper.get(`${baseUrl}/${id}`)
        );
    }

    function update() {
        return createAsyncThunk(
            `${name}/update`,
            async function ({ id, data }, { getState, dispatch }) {
                await fetchWrapper.put(`${baseUrl}/${id}`, data);

                // update stored user if the logged in user updated their own record
                const product = getState().products.value;
                
                //if (id === category?.id.toString()) {
                    // update local storage
                    const products = { ...product, ...data };
                    localStorage.setItem('products', JSON.stringify(products));

                    // update auth user in redux state
                    dispatch(setUpdate(product));
                //}
            }
        );
    }

    // prefixed with underscore because delete is a reserved word in javascript
    function _delete() {
        return createAsyncThunk(
            `${name}/delete`,
            async function (id, { getState, dispatch }) {
                await fetchWrapper.delete(`${baseUrl}/${id}`);

                // auto logout if the logged in user deleted their own record
                //if (id === getState().auth.value?.id) {
                  //  dispatch(authActions.logout());
                //}
            }
        );
    }
}

function createExtraReducers() {
    return (builder) => {
        getAll();
        getById();
        _delete();

        function getAll() {
            var { pending, fulfilled, rejected } = extraActions.getAll;
            builder
                .addCase(pending, (state) => {
                    state.list = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.list = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.list = { error: action.error };
                });
        }

        function getById() {
            var { pending, fulfilled, rejected } = extraActions.getById;
            builder
                .addCase(pending, (state) => {
                    state.item = { loading: true };
                })
                .addCase(fulfilled, (state, action) => {
                    state.item = { value: action.payload };
                })
                .addCase(rejected, (state, action) => {
                    state.item = { error: action.error };
                });
        }
        function _delete() {
            var { pending, fulfilled, rejected } = extraActions.delete;
            builder
                .addCase(pending, (state, action) => {
                    const user = state.list.value.find(x => x.id === action.meta.arg);
                    user.isDeleting = true;
                })
                .addCase(fulfilled, (state, action) => {
                    state.list.value = state.list.value.filter(x => x.id !== action.meta.arg);
                })
                .addCase(rejected, (state, action) => {
                    const user = state.list.value.find(x => x.id === action.meta.arg);
                    user.isDeleting = false;
                });
        }
    }
}

export const productActions = { ...slice.actions, ...extraActions};
export const productsReducer = slice.reducer;