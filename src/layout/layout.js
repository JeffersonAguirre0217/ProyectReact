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

function Layout() {

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

    const styleLoyout = {

    }


    return (
        <div id='Layout' >
            <Nav></Nav>
            <div className="grid grid-cols-1 sm:grid-cols-5  md:grid-cols-7">
                <div className="">
                    <ul className="App-header pt-2">
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
                <div className="col-span-12 md:col-span-6">
                    <div className="container">
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