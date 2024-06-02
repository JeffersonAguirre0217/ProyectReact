import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alertSlice';
import { authReducer } from './authSlice';
import { usersReducer } from './userSlice';
import { categoriesReducer } from './categorySlice';
import { productsReducer } from './productSlice';

export * from './alertSlice';
export * from './authSlice';
export * from './userSlice';
export * from './categorySlice';
export * from './productSlice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        users: usersReducer,
        categories: categoriesReducer,
        products: productsReducer
    },
});