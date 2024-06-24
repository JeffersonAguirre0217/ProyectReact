import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { actionProducts } from '../../zustand/productZustand';

export { ProductDetail };

function ProductDetail() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const product = actionProducts.getById(id)
    

    useEffect(() => {
        setTitle('Detail of ' + product.name );
    }, []);


    return (
        <div className='mt-3'>
            <h2>{title}</h2>
            {!(product?.loading || product?.error) &&
                <div className='container'>
                    <div className="row">
                        <div className='mb-3 col-12'>
                            
                        </div>
                        <div className="mb-2 col">
                            <label className="form-label">Product</label>
                            <h4>{product.name}</h4>
                            <p></p>
                        </div>
                        <div className="mb-2 col-3">
                            <label className="form-label">Cant</label>
                            <h4>{product.cant}</h4>
                            <p></p>
                        </div>
                        <div className="mb-2 col-3">
                            <label className="form-label">Price</label>
                            <h4>{product.price}</h4>
                            <p></p>
                        </div>
                        <div className="mb-2 col-3">
                            <label className="form-label">Category</label>
                            <h4>{product.category}</h4>
                            <p></p>
                        </div>
                        <div className="mb-2 col-12">
                            <label className="form-label">description</label>
                            <p>{product.categoryDescription}</p>
                        </div>
                        <div className="mb-3">
                            <Link to="/products" className="btn btn-danger m-2">Back</Link>
                            
                        </div>
                    </div>
                </div>
            }
            {product?.loading &&
                <div className="text-center m-5">
                <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {product?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading user: {product.error}</div>
                </div>
            }
        </div>                   
    )
}