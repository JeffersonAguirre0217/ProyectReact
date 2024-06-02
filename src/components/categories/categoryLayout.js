import { Routes, Route } from 'react-router-dom';

import { Categories } from '../categories/categories.js';
import { AddEdit } from './addEditTemplate';

export { CategoriesLayout };

function CategoriesLayout () {
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route index element={<Categories />} />
                    <Route path="add" element={<AddEdit />} />
                    <Route path="edit/:id" element={<AddEdit />} />
                </Routes>
            </div>
        </div>
    );
}