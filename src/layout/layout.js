import './layout.css';
import { Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faLayerGroup, faList, } from '@fortawesome/free-solid-svg-icons';

import Products from '../components/products/products.js';
import { Categories } from '../components/categories/categories.js';
import Dashboard from '../components/dashboard/dashboard.js';
import { AddEdit } from '../components/categories/addEditTemplate.js';
import { AddEditProduct } from '../components/products/addEditTemplateProduct.js';
import { Nav } from './nav.jsx';
import { ProductDetail } from '../components/products/productDetail .js';
import { storeApp } from '../zustand/storeZustand.js';

function Layout() {
    const hiddenMenu = storeApp (state => state.menu)
    const initData = [
        {
            icon: faDashboard,
            name: 'Dashboard',
            path: '/'
        },
        {
            icon: faList,
            name: 'Categories',
            path: '/categories'
        },
        {
            icon: faLayerGroup,
            name: 'Products',
            path: '/products'
        }
    ]

    return (
        <div id='Layout'>
            <Nav></Nav>
            <div className="grid grid-cols-1 sm:grid-cols-5  md:grid-cols-5">
                <div id='Sidebar' className={`bg-slate-900 p-0 ${hiddenMenu}`} >
                    <ul className=" m-0 h-screen">
                        {initData.map((item, index) =>
                            <Link key={index} to={item.path}>
                                <li className='App-link'>
                                    <FontAwesomeIcon icon={item.icon} className='iconClass' />
                                    <label className='p-2'>{item.name}</label>
                                </li>
                            </Link>
                        )}
                        
                    </ul>
                </div>
                <div className="col-span-12 md:col-span-4 ">
                    <div className="container overflow-y: scroll">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/add" element={<AddEditProduct />} />
                            <Route path="/products/edit/:id" element={<AddEditProduct />} />
                            <Route path="/products/detail/:id" element={<ProductDetail />} />

                            <Route path='/categories' element={<Categories />} />
                            <Route path="/categories/add" element={<AddEdit />} />
                            <Route path="/categories/edit/:id" element={<AddEdit />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Layout;