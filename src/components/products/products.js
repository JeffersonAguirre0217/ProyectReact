import './products.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash , faEye} from '@fortawesome/free-solid-svg-icons';
import { storeApp } from '../../zustand/storeZustand';
import { actionProducts } from '../../zustand/productZustand';
import { Alert } from '../shared/alert/alert'
import { ContainerGeneral, ContainerSpace, ContainerTitle } from '../shared/styledComponent/styledContainer';
import { LinkButton } from '../shared/styledComponent/styledButton';
import { BodyCardProduct, CardContentImage, CardProducts, ContentButtonsProduct, DeleteButtonProduct, ExtraInfoCardProduct, GridProducts, ImageProduct, MoreInfoButtonProduct, UpdateButtonProduct } from './styledProduct';

function Products() {

    const products = storeApp(state => state.products.list)

    return (
        <ContainerGeneral>
            <ContainerTitle>Products</ContainerTitle>
            <Alert />
            {products.length > 0 &&
                <div className='scroll-smooth'>
                    <LinkButton to="add">
                        Add Product
                    </LinkButton>
                    <ContainerSpace></ContainerSpace>
                    <GridProducts>
                        {products.map((product, index) =>
                            <CardProducts key={index}>
                                <CardContentImage>
                                    {product.urlImg ? <ImageProduct src={`data:image/jpeg;base64,${product.urlImg}`} alt={product.name} /> : <img src="https://cdn.icon-icons.com/icons2/943/PNG/512/shoppaymentorderbuy-10_icon-icons.com_73874.png" alt="..." />}
                                </CardContentImage>
                                <BodyCardProduct>
                                    <div>
                                        <h5>{product.name}</h5>
                                    </div>
                                    <ContentButtonsProduct>
                                        <MoreInfoButtonProduct to={`detail/${product.id}`}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </MoreInfoButtonProduct>
                                        <UpdateButtonProduct to={`edit/${product.id}`}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </UpdateButtonProduct>
                                        <DeleteButtonProduct onClick={() => actionProducts.deleteProduct(product.id)}>
                                            {product.isDeleting
                                                ? <span className="spinner-border spinner-border-sm"></span>
                                                : <span><FontAwesomeIcon icon={faTrash} className='m-0' /></span>
                                            }
                                        </DeleteButtonProduct>
                                    </ContentButtonsProduct>

                                </BodyCardProduct>
                                <p>{product.categoryDescription}</p>
                                <ExtraInfoCardProduct>
                                    <div>
                                        <small><b>Cant:</b></small>
                                        {product.cant}
                                    </div>
                                    <div>
                                        <small ><b>Price:</b></small>
                                        ${product.price}
                                    </div>
                                </ExtraInfoCardProduct>

                            </CardProducts>
                        )}
                    </GridProducts>
                </div>
            }
            {products.length === 0 &&
                <div className="text-center m-5">
                    <h4>You don't have any products created yet</h4>
                    <LinkButton to="add">
                        Add Product
                    </LinkButton>
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
        </ContainerGeneral>

    );
}

export default Products;