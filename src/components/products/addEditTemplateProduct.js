import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../shared/helper/history';
import { productActions } from '../../redux/productSlice';
import { categoryActions } from '../../redux/categorySlice';
import { alertActions } from '../../redux/alertSlice';
import { Alert } from '../shared/alert/alertLogin';

export { AddEditProduct };

function AddEditProduct() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const product = useSelector(x => x.products?.item);
    const categories = useSelector(x => x.categories?.list);

    function healdfile(e){
        setFile(e.target.files[0]);
        console.log('fil', e.target.files);

    }

    // form validation rules 
    const validationSchema = Yup.object().shape({
        file: Yup.object()
            .required('Product imge is required'),
        name: Yup.string()
            .required('Product name is required'),
        cant: Yup.string()
            .required('Cant is required'),
        price: Yup.string()
            .required('Price is required'),
        category: Yup.string()
            .required('Category is required'),
        categoryDescription: Yup.string()
            .required('Description is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit product');
            // fetch user details into redux state and 
            // populate form fields with reset()
            dispatch(productActions.getById(id)).unwrap()
                .then(product => reset(product));
            dispatch(categoryActions.getAll());
        } else {
            setTitle('Add product');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(productActions.update({ id, data })).unwrap();
                message = 'category updated';
            } else {
                await dispatch(productActions.create(data)).unwrap();
                message = 'Category added';
            }

            // redirect to user list with success message
            history.navigate('/products');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className='mt-3'>
            <Alert />
            <h2>{title}</h2>
            {!(product?.loading || product?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row"> 
                    <div className='mb-3 col'>
                    <input type="file" {...register('file')} onChange={(healdfile)}></input>
                    { file ? <img alt="Preview" height="60" src={URL.createObjectURL(file)} /> : null }
                    </div>
                    <div className="mb-3 col">
                            <label className="form-label">Product</label>
                            <input name="lastName" type="text" {...register('name')} className={`form-control ${errors.cant ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Cant</label>
                            <input name="lastName" type="text" {...register('cant')} className={`form-control ${errors.cant ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.cant?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Price</label>
                            <input name="lastName" type="text" {...register('price')} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.price?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Category</label><br></br>
                            <select {...register("category")}>
                            {categories?.value?.map(category =>
                                <option value={category.name}>{category.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">description</label>
                            <input name="lastName" type="text" {...register('categoryDescription')} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.categoryDescription?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/products" className="btn btn-danger m-2">Cancel</Link>
                    </div>
                </form>
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
    );
}