import './products.css';

//import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import { storeApp } from '../../zustand/storeZustand';
import { actionProducts } from '../../zustand/productZustand';

function Products(){

    const products = storeApp(state => state.products.list)
    let imgs = JSON.parse(localStorage.getItem('imgTest')) || [];
    const styleProduct={
        buttonAdd:'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-40 py-2  rounded-full',
        buttonUpdate:'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 py-1 px-2 m-1  rounded-md',
        buttonDetail:'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300 py-1 px-2 m-0  rounded-md',
        buttonDelete:'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 py-1 px-2 m-0  rounded-md',
    }
    // useEffect(() => {
    //     //dispatch(productActions.getAll());
    // }, []); 

    

    return(
        <div className='container py-3'>
            <h4>Products</h4>
            <Link to="add"  className='block py-2'>
                <button key={'1'} className={styleProduct.buttonAdd}>Add Product</button>
            </Link>
            {!(products?.loading || products?.error) &&
            <div className='container'>
                {products.map((product, index) =>
                    <div key={index} id='cardProduct' className='grid grid-cols-1 my-3 rounded-md'>
                        <div className='row'>
                            <div className='col-lg-2 col-sm-12 text-center'>
                                {product.urlImg ? <img className='img-product mt-2' src={`data:image/jpeg;base64,${product.urlImg}`} alt={product.name} /> : <img className='img-product mt-2' src="https://cdn.icon-icons.com/icons2/943/PNG/512/shoppaymentorderbuy-10_icon-icons.com_73874.png" alt="..." />}
                            </div>
                            <div className='col-lg-7 col-sm-12'>
                                <div className="card-body">
                                    <div className='row'>
                                        <div className='col-3'>
                                            <small >Product</small> <br></br>
                                            {product.name}
                                        </div>
                                        <div className='col-3'>
                                            <small >Category</small> <br></br>
                                            {product.category}
                                        </div>
                                        <div className='col-3'>
                                            <small >Cant</small> <br></br>
                                            {product.cant}
                                        </div>
                                        <div className='col-3'>
                                            <small >Price</small> <br></br>
                                            ${product.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-sm-12'>
                                <div className="card-body">
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