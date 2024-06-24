import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';


// init data

const initialStateCategories = {
    list: [],
    loading: false
}

const initialStateProducts = {
    list: [],
    loading: false
}

const initialStateUsers = {
    list: []
}

const auth = null

const initialState ={
    categories :initialStateCategories,
    products: initialStateProducts,
    users: initialStateUsers,
    auth: auth
}

export  const initialiceSlice = () =>  initialState;
const persistInitialState = persist(initialiceSlice, {name: 'storeApp'}); 
export const storeApp = create(devtools(persistInitialState));



