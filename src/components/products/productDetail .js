import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { actionProducts } from '../../zustand/productZustand';
import { set } from 'react-hook-form';

export { ProductDetail };

function ProductDetail() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [product, setProduct ] =useState(null)


    useEffect(() => {
        getProductDetailById(id)
        
    }, []);

    async function getProductDetailById(id){
        const result = await actionProducts.getById(id)
        setProduct(result)
        setTitle('Detail of ' + result.name);
    }

    return (
        <div className='container p-2'>
            <h2>{title}</h2>
            {product &&
                <div className='container cardDetail rounded-lg'>
                    <div className="grid  grid-cols-1 md:grid-cols-3 p-4">
                        <div className='pr-4'>
                            {product.urlImg ? <img className='' src={`data:image/jpeg;base64,${product.urlImg}`} alt={product.name} /> : <img className='img-product' src="https://cdn.icon-icons.com/icons2/943/PNG/512/shoppaymentorderbuy-10_icon-icons.com_73874.png" alt="..." />}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2">
                            <div>
                                <h5 className="form-h5">Product</h5>
                                <p>{product.name}</p>
                            </div>
                            <div >
                                <h5>Cant</h5>
                                <p>{product.cant}</p>
                            </div>
                            <div >
                                <h5>Price</h5>
                                <p>{product.price}</p>
                            </div>
                            <div >
                                <h5>Category</h5>
                                <p>{product.category}</p>
                            </div>
                            <div className="col-span-2">
                                <h5 className="">description</h5>
                                <p>{product.categoryDescription}</p>
                            </div>
                        </div>


                    </div>
                    <div>
                        <Link to="/products" className="btn btn-danger m-2">Back</Link>

                    </div>
                </div>
            }
            {!product &&
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