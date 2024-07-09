import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { actionProducts } from '../../zustand/productZustand';
import { ContentButtonsAddUp, ImageProduct, ImgButton } from './styledProduct';
import { CancelButton, LinkButton, ResetButton, SaveButton } from '../shared/styledComponent/styledButton';
import { actionCategories } from '../../zustand/categoryZustand';
import { Alert } from '../shared/alert/alert';

export { AddEditProduct };

function AddEditProduct() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState(null)
    const [loading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        getAllCategories()
        
        if (id ) {
            getProductById(id)
            setTitle('Edit product');
        } else {
            setTitle('Add product');
            setIsLoading(false)
        }
    }, []);

    async function getAllCategories(){
        const items = await actionCategories.getAll()
        setCategories(items.categories.list)
    }

    async function getProductById(id){
        
        const item = await actionProducts.getById(id)
        setProduct(item)
            setValue('name', item.name,)
            setValue('cant', item.cant)
            setValue('price', item.price)
            setValue('categoryDescription', item.categoryDescription)
            setValue('category', item.category)
            setIsLoading(false)
    }

    // form validation rules 
    const validationSchema = Yup.object().shape({
        urlImg: Yup.string()
            .required('Product name is required'),
        name: Yup.string()
            .required('Product name is required').min(4, 'Product name must be at least 4 characters'),
        cant: Yup.string()
            .required('Cant is required').max(5, 'Cant only can to have 4 characters'),
        price: Yup.string()
            .required('Price is required').max(5, 'Cant only can to have 4 characters'),
        category: Yup.string()
            .required('Category is required'),
        categoryDescription: Yup.string()
            .required('Description is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, setValue, formState, } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function healdfile(e) {
        setFile(e.target.files[0]);
    }

    const ImageSection = (() => {
        if(product && !file){
            return <ImageProduct src={`data:image/jpeg;base64,${product.urlImg}`} alt={product.name} /> 
        }else if(!product && file){
            return <ImageProduct alt="Preview"  src={URL.createObjectURL(file)} />    
        }else if(product && file){
            return <ImageProduct alt="Preview"  src={URL.createObjectURL(file)} />    
        }
    })

    async function convertToBase64(file) {
        if (!file) return null;
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onloadend = () => {
                const base64 = btoa(reader.result);
                resolve(base64);
            };
            reader.onerror = (error) => reject(error);
        });
    }

    async function onSubmit(data) {

        if (file) {
            data.urlImg = await convertToBase64(file)
        }else{
            data.urlImg = null
        }

        if (id) {
            actionProducts.updateProduct(id, data)
        } else {
            actionProducts.addNewProduct(data)
        }
    }

    return (
        <div className='mt-3'>
            <h2>{title}</h2>
            <Alert />
            {categories &&
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className='mb-3 grid grid-cols-2'>
                        <ImgButton type="file" {...register('urlImg')} onChange={(healdfile)}></ImgButton>
                        <ImageSection/>
                    </div>
                    <div className="mb-3 col-12">
                        <label className="form-label">Product</label>
                        <input name="lastName" type="text" {...register('name')} className={`form-control ${errors.cant ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>
                    <div className="mb-3 col-4">
                        <label className="form-label">Cant</label>
                        <input name="lastName" type="text" {...register('cant')} className={`form-control ${errors.cant ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.cant?.message}</div>
                    </div>
                    <div className="mb-3 col-4">
                        <label className="form-label">Price</label>
                        <input name="lastName" type="text" {...register('price')} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.price?.message}</div>
                    </div>
                    <div className="mb-3 col-4">
                        <label className="form-label">Category</label><br></br>
                        <select {...register("category")} className='selectroCategory'>
                            {categories.map(category =>
                                <option key={category.id}>{category.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3 col-12">
                        <label className="form-label">description</label>
                        <input name="lastName" type="text" {...register('categoryDescription')} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.categoryDescription?.message}</div>
                    </div>
                </div>
                <ContentButtonsAddUp>
                    <SaveButton type="submit" disabled={isSubmitting}>
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Save
                    </SaveButton>
                    <ResetButton onClick={() => reset()} disabled={isSubmitting}>Reset</ResetButton>
                    <CancelButton to="/products">Cancel</CancelButton>
                </ContentButtonsAddUp>
            </form>
            }
            {loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            } 
            {!product && !categories &&
                <div className="text-center m-5">
                <h4>You don't have any categories created yet</h4>
                <LinkButton to="http://localhost:3000/categories/add">
                    Add Category
                </LinkButton>
            </div>
            }

        </div>
    );
}