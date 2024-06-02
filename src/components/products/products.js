import './products.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {productActions } from '../../redux/productSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons';

function Products(){

    const products = useSelector(x => x.products.list);
    const dispatch = useDispatch(); 
    
    useEffect(()=> {
        dispatch(productActions.getAll());
    },[]); 

    

    return(
        <div className='container-fluid'>
            <div className='header mt-2'>
                <div className='row'>
                    <div className='col-mb-4'> <h4>Products</h4></div>
                    <div className='col-mb-4'> </div>
                    <div className='col-mb-4'> 
                    <Link to="add" className="btn btn-sm btn-success mb-2">Add product</Link>
                    </div>
                </div>
            </div>
            {!(products?.loading || products?.error) &&
            <div className='row mt-2'>
                <div className='col-mb-12'>
                {products?.value?.map(product =>
                    <div id='cardProduct' className='card mt-2'>
                        <div className='row'>
                            <div className='row'>
                                <div className='col-lg-2 col-sm-12 text-center'>
                                    {product.file ? <img className='img-product mt-2' src={product.file} alt={product.name}/> : <img className='img-product mt-2' src="https://cdn.icon-icons.com/icons2/943/PNG/512/shoppaymentorderbuy-10_icon-icons.com_73874.png" alt="..."/>}
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
                                        <Link to={`detail/${product.id}`} className="btn btn-sm btn-secondary me-1"><FontAwesomeIcon icon={faEye} className='m-0'/></Link>
                                        <Link to={`edit/${product.id}`} className="btn btn-sm btn-primary me-1"><FontAwesomeIcon icon={faEdit} className='m-0'/></Link>
                                        <button onClick={() => dispatch(productActions.delete(product.id))} className="btn btn-sm btn-danger">
                                            {product.isDeleting 
                                            ? <span className="spinner-border spinner-border-sm"></span>
                                            : <span><FontAwesomeIcon icon={faDeleteLeft} className='m-0'/></span>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
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