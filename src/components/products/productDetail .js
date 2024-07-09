import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { actionProducts } from '../../zustand/productZustand';
import { set } from 'react-hook-form';
import { ContainerGeneral, ContainerTitle } from '../shared/styledComponent/styledContainer';
import { CardProductDetail, ContentCardButtonProductDetail, ContentCardImgProductDetail, ContentCardProductDetail, ContentCardTextProductDetail } from './styledProduct';
import { CancelButton } from '../shared/styledComponent/styledButton';

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
        <ContainerGeneral>
            <ContainerTitle>{title}</ContainerTitle>
            {product &&
                <CardProductDetail>
                    <ContentCardProductDetail>
                        <ContentCardImgProductDetail>
                            {product.urlImg ? <img className='' src={`data:image/jpeg;base64,${product.urlImg}`} alt={product.name} /> : <img className='img-product' src="https://cdn.icon-icons.com/icons2/943/PNG/512/shoppaymentorderbuy-10_icon-icons.com_73874.png" alt="..." />}
                        </ContentCardImgProductDetail>
                        <ContentCardTextProductDetail>
                            <div>
                                <h5>Product</h5>
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
                        </ContentCardTextProductDetail>
                    </ContentCardProductDetail>
                    <ContentCardButtonProductDetail>
                        <CancelButton to="/products">Back</CancelButton>
                    </ContentCardButtonProductDetail>
                </CardProductDetail>
            }
            {!product &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
        </ContainerGeneral>
    )
}