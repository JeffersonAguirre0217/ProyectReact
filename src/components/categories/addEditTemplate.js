import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import  { actionCategories } from '../../zustand/categoryZustand';
import  { Alert } from '../shared/alert/alert'
import { CancelButton, ResetButton, SaveButton } from '../shared/styledComponent/styledButton';
import { ContentButtonsAddUp } from '../products/styledProduct';



function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const category = actionCategories.getById(id)

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Category is required').min(4, 'Category name must be at least 4 characters'),
        description: Yup.string()
            .required('Description is required').min(6, 'Description must be at least 6 characters'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    //useForm() hook
    const { register, handleSubmit, reset, setValue, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit category');
            setValue('name', category.name,)
            setValue('description', category.description)
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
    }

    return (
        <div className='mt-3'>
            <h2>{title}</h2>
                <Alert />
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
                    <ContentButtonsAddUp>
                        <SaveButton type="submit" disabled={isSubmitting}>
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </SaveButton>
                        <ResetButton onClick={() => reset()} type="button" disabled={isSubmitting}>Reset</ResetButton>
                        <CancelButton to="/categories">Cancel</CancelButton>
                    </ContentButtonsAddUp>
                </form>            
        </div>
    );
}

export { AddEdit };