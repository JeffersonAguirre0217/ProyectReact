import './products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { actionProducts } from '../../zustand/productZustand';
import { Alert } from '../shared/alert/alert'
import { ContainerGeneral, ContainerSpace, ContainerTitle } from '../shared/styledComponent/styledContainer';
import { LinkButton } from '../shared/styledComponent/styledButton';
import { BodyCardProduct, CardContentImage, CardProducts, ContenSelectFilters, ContentAddButton, ContentButtonsProduct, ContentFilters, DeleteButtonProduct, ExtraInfoCardProduct, GridProducts, ImageProduct, MoreInfoButtonProduct, SearchProducts, UpdateButtonProduct } from './styledProduct';
import { useState, useEffect } from 'react';
import { actionCategories } from '../../zustand/categoryZustand';

function Products() {
    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState(null)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        getAllCategories()
        getAllProducts()
        
    }, []);

    async function getAllProducts() {
        const items = await actionProducts.getAll()
        setProducts(items.products.list)
        setIsLoading(items.products.loading)
    }

    async function getAllCategories() {
        const items = await (await actionCategories.getAll()).categories.list
        setCategories(items)
        
    }

    async function filterProduct(e) {
        setIsLoading(true)
        let search = await actionProducts.filterByProduct(e.target.value)
        setProducts (search)
        setIsLoading(false)
    }

    async function filterProductByCategory(e) {
        setIsLoading(true)
        let search = await actionProducts.filterByCategory(e.target.value)
        setProducts (search)
        setIsLoading(false)
    }

    return (
        <ContainerGeneral>
            <ContainerTitle>Products</ContainerTitle>
            <Alert />
            {products &&
                <div className='scroll-smooth'>
                    <ContentFilters >
                        <ContentAddButton>
                            <LinkButton to="add">
                                Add Product
                            </LinkButton>
                        </ContentAddButton>

                        <label htmlFor="search-form">
                            <SearchProducts
                                type="search"
                                placeholder="Search Category"
                                onChange={(filterProduct)}
                            />
                            <span className="sr-only">Search Category</span>
                        </label>
                        <ContenSelectFilters>
                            <select className='selectroCategory' onChange={(filterProductByCategory)}>
                            <option >All</option>
                                {categories.map((category, index) =>
                                    <option key={index} >{category.name}</option>
                                )}
                            </select>
                        </ContenSelectFilters>
                    </ContentFilters>

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
            {!products &&
                <div className="text-center m-5">
                    <h4>You don't have any products created yet</h4>
                    <LinkButton to="add">
                        Add Product
                    </LinkButton>
                </div>
            }
            {loading &&
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