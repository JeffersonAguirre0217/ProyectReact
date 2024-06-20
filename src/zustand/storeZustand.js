import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';


// init data

const categoriesInitialState = {
    categories: [],
    products: [],
    auth: null
}

export  const categoriesSlice = () =>  categoriesInitialState;
const persistCategories = persist(categoriesSlice, {name: 'categories'}); 
export const storeCategories = create(devtools(persistCategories));



