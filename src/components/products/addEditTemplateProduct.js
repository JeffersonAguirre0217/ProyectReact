import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { storeApp } from '../../zustand/storeZustand';
import { actionProducts } from '../../zustand/productZustand';

export { AddEditProduct };

function AddEditProduct() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [file, setFile] = useState(null);
    const product = actionProducts.getById(id)
    const categories = storeApp(state => state.categories.list)

    const styleOptions = {
        buttonAdd: 'file:bg-violet-500 file:hover:bg-violet-600 file:active:bg-violet-700 file:focus:outline-none file:focus:ring file:focus:ring-violet-300 file:text-white w-auto file:py-2  file:rounded-md',
        buttonSave: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 py-2 px-3 m-1  rounded-md',
        buttonReset: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300 py-2 px-3 m-0  rounded-md',
        buttonBack: 'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 py-2 px-3 m-1  rounded-md',
    }

    useEffect(() => {

        if (id) {
            setTitle('Edit product');
            setValue('name', product.name,)
            setValue('cant', product.cant)
            setValue('price', product.price)
            setValue('categoryDescription', product.categoryDescription)
            setValue('category', product.category)

        } else {
            setTitle('Add product');
        }

    }, []);

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

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className='mb-3 col-12'>
                        <input type="file" className={styleOptions.buttonAdd} {...register('urlImg')} onChange={(healdfile)}></input>
                        {file ? <img alt="Preview" height="60" src={URL.createObjectURL(file)} /> : null}
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
                <div className="mb-3">
                    <button type="submit" disabled={isSubmitting} className={styleOptions.buttonSave}>
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Save
                    </button>
                    <button onClick={() => reset()} type="button" disabled={isSubmitting} className={styleOptions.buttonReset}>Reset</button>
                    <Link to="/products"><button className={styleOptions.buttonBack}>Cancel</button></Link>
                </div>
            </form>

            {/* {
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            } */}
            {/*product?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading user: {product.error}</div>
                </div> */}

        </div>
    );
}