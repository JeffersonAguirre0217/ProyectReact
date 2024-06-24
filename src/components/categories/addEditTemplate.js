import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { history } from '../shared/helper/history';

import  { actionCategories } from '../../zustand/categoryZustand';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const styleOptions={
        buttonAdd:'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-40 py-2  rounded-full',
        buttonSave:'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 py-2 px-3 m-1  rounded-md',
        buttonReset:'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300 py-2 px-3 m-0  rounded-md',
        buttonBack:'bg-red-500 hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 py-2 px-3 m-1  rounded-md',
    }

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Category is required'),
        description: Yup.string()
            .required('Description is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    //useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit category');
            const category = actionCategories.getById(id)
        } else {
            setTitle('Add category');
        }
    }, []);

    function onSubmit(data){
        
        if(id){
            actionCategories.updateCategory(id, data)
            
        }else{
            actionCategories.addNewCategory(data)
        }

        history.navigate('/categories')
    }

    return (
        <div className='mt-3'>
            <h2>{title}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Category</label>
                            <input name="firstName" type="text" {...register('name')}  className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Description</label>
                            <input name="lastName" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.description?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className={styleOptions.buttonSave}>
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className={styleOptions.buttonReset}>Reset</button>
                        <Link to="/categories"><button className={styleOptions.buttonBack}>Cancel</button></Link>
                    </div>
                </form>            
        </div>
    );
}