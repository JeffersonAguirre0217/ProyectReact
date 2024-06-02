import { createSlice } from '@reduxjs/toolkit';

// create slice

const name = 'alert';
const initialState = createInitialState();
const reducers = createReducers();
const slice = createSlice({ name, initialState, reducers });

function createInitialState() {
    return {
        value: null
    }
}

function createReducers() {
    return {
        success,
        error,
        clear
    };
    
    // payload = string message ('alert message')
    // an object ({ message: 'alert message', showAfterRedirect: true })
    function success(state, action) {
        state.value = {
            type: 'alert-success',
            message: action.payload?.message || action.payload,
            showAfterRedirect: action.payload?.showAfterRedirect,
        };
    }

    function error(state, action) {
        state.value = {
            type: 'alert-danger',
            message: action.payload?.message || action.payload,
            showAfterRedirect: action.payload?.showAfterRedirect
        };
    }

    function clear(state) {
        // if showAfterRedirect is true the alert is not cleared 
        if (state.value?.showAfterRedirect) {
            state.value.showAfterRedirect = false;
        } else {
            state.value = null;
        }
    }
}

export const alertActions = { ...slice.actions };
export const alertReducer = slice.reducer;