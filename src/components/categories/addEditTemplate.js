import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '../shared/helper/history';
import { categoryActions } from '../../redux/categorySlice';
import { alertActions } from '../../redux/alertSlice';
import { Alert } from '../shared/alert/alertLogin';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const category = useSelector(x => x.categories?.item);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Category is required'),
        description: Yup.string()
            .required('Description is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit category');
            // fetch user details into redux state and 
            // populate form fields with reset()
            dispatch(categoryActions.getById(id)).unwrap()
                .then(category => reset(category));
        } else {
            setTitle('Add category');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(categoryActions.update({ id, data })).unwrap();
                message = 'category updated';
            } else {
                await dispatch(categoryActions.create(data)).unwrap();
                message = 'Category added';
            }

            // redirect to user list with success message
            history.navigate('/categories');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className='mt-3'>
            <Alert/>
            <h2>{title}</h2>
            {!(category?.loading || category?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Category</label>
                            <input name="firstName" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Description</label>
                            <input name="lastName" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.description?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/categories" className="btn btn-danger m-2">Cancel</Link>
                    </div>
                </form>
            }
            {category?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {category?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading user: {category.error}</div>
                </div>
            }
        </div>
    );
}