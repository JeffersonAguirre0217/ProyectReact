import './layout.css';
import {
    Routes,
    Route,
    Link,
} from "react-router-dom";
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
    return (
        <div id='Layout' >
            <Nav></Nav>
            <div className="row m-0 p-0">
                <div className="col-md-2 m-0 p-0">
                    <ul className="App-header pt-2">
                        <Link to="/">
                            <li className='App-link'>
                                <FontAwesomeIcon icon={faDashboard} className='iconClass'/>
                                <label className='p-2'>Dashboard</label>
                            </li>
                        </Link>

                        <Link to="/categories">
                            <li className='App-link'>
                                <FontAwesomeIcon icon={faList} className='iconClass' />  
                                <label className='p-2'>Categories</label>
                            </li>
                        </Link>

                        <Link to="/products">
                            <li className='App-link'>
                                <FontAwesomeIcon icon={faLayerGroup} className='iconClass' /> 
                                <label className='p-2'>Products</label>
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="col-md-10">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Dashboard />}/>
                            <Route path="/products" element={<Products />}/>
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