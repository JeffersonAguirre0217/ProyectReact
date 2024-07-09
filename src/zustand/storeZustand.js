import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';


// init data

const initialStateCategories = {
    list: null,
    loading: null
}

const initialStateProducts = {
    list: null,
    loading: null
}

const initialAlert = {
    message: null,
    type: null,
    error: null
}

const initialStateUsers = {
    list: []
}

const auth = null

const showMenu = null

const initialState ={
    categories :initialStateCategories,
    products: initialStateProducts,
    users: initialStateUsers,
    alert: initialAlert,
    auth: auth,
    menu: showMenu
}

export  const initialiceSlice = () =>  initialState;
const persistInitialState = persist(initialiceSlice, {name: 'storeApp'}); 
export const storeApp = create(devtools(persistInitialState));



