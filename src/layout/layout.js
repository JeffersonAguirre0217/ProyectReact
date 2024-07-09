import './layout.css';
import { Routes, Route } from "react-router-dom";
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
import { ContentLayout, ContentPage, ContentSidebar, ItemsSidebar, Sidebar } from './styledLayout.js';

function Layout() {
    const hiddenMenu = storeApp(state => state.menu)
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
        <div>
            <Nav></Nav>
            <ContentLayout>
                <Sidebar className={`${hiddenMenu}`} >
                    <ContentSidebar>
                        {initData.map((item, index) =>
                            <ItemsSidebar key={index} to={item.path}>
                                <label><FontAwesomeIcon icon={item.icon} />
                                {' ' + item.name} </label>
                            </ItemsSidebar>
                        )}

                    </ContentSidebar>
                </Sidebar>
                <ContentPage>
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
                </ContentPage>
            </ContentLayout>
        </div>
    );
}
export default Layout;