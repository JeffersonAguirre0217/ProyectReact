import './products.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { storeApp } from '../../zustand/storeZustand';
import { actionProducts } from '../../zustand/productZustand';
import { Alert } from '../shared/alert/alert'

function Products() {

    const products = storeApp(state => state.products.list)
    const styleProduct = {
        buttonAdd: 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-40 py-2  rounded-full',
        buttonUpdate: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 py-1 px-2 m-0  rounded-md',
        buttonDetail: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300 py-1 px-2 m-0  rounded-md',
        buttonDelete: 'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 py-1 px-2 m-0  rounded-md',
    }


    return (
        <div className='container py-3'>
            <h4>Products</h4>
            <Alert />
            {products.length > 0 &&
                <div className='container scroll-smooth'>
                    <Link to="add">
                        <button key={'1'} className={styleProduct.buttonAdd}>Add Product</button>
                    </Link>
                    {products.map((product, index) =>
                        <div key={index} id='cardProduct' className='bg-slate-100 grid grid-rows-1 grid-flow-col my-3 rounded-lg'>
                            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-8 p-4'>
                                <div className='flex justify-center'>
                                    {product.urlImg ? <img className='img-product' src={`data:image/jpeg;base64,${product.urlImg}`} alt={product.name} /> : <img className='img-product' src="https://cdn.icon-icons.com/icons2/943/PNG/512/shoppaymentorderbuy-10_icon-icons.com_73874.png" alt="..." />}
                                </div>
                                <div className='col-span-6'>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:p-4 lg:grid-cols-4">
                                        <div>
                                            <h5>Product</h5> 
                                            {product.name}
                                        </div>
                                        <div>
                                            <h5 >Category</h5> 
                                            {product.category}
                                        </div>
                                        <div>
                                            <h5 >Cant</h5> 
                                            {product.cant}
                                        </div>
                                        <div>
                                            <h5 >Price</h5>
                                            ${product.price}
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className="grid grid-flow-col lg:justify-stretch sm:justify-end mt-2">
                                        <Link to={`detail/${product.id}`}>
                                            <button className={styleProduct.buttonDetail}><FontAwesomeIcon icon={faEye} /></button></Link>
                                        <Link to={`edit/${product.id}`}>
                                            <button className={styleProduct.buttonUpdate}><FontAwesomeIcon icon={faEdit} /></button></Link>
                                        <button onClick={() => actionProducts.deleteProduct(product.id)} className={styleProduct.buttonDelete}>
                                            {product.isDeleting
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : <span><FontAwesomeIcon icon={faDeleteLeft} className='m-0' /></span>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
            {products.length === 0 &&
                <div className="text-center m-5">
                    <h4>You don't have any products created yet</h4>
                    <Link to="add" className=' py-2'>
                        <button className={styleProduct.buttonAdd}>Add Product</button>
                    </Link>
                </div>
            }
            {products?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {products?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading  {products.error}</div>
                </div>
            }
        </div>

    );
}

export default Products;