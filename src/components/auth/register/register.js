import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//import { useDispatch } from 'react-redux';

import { history } from '../../shared/helper/history';
import { userActions } from '../../../redux/userSlice';
import { actionUser } from '../../../zustand/userZustand';
//import { alertActions } from '../../../redux/alertSlice';

//import { Alert } from '../../shared/alert/alertLogin';

function Register(){

    //const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    // async function onSubmit(data) {
    //     //dispatch(alertActions.clear());
    //     try {
    //         await dispatch(userActions.register(data)).unwrap();

    //         // redirect to login page and display success alert
    //         history.navigate('/login');
    //         dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
    //     } catch (error) {
    //         dispatch(alertActions.error(error));
    //     }
    // } 

    function onSubmit(data) {
        console.log(data)
        actionUser.registerUser(data);
        history.navigate('/login');
    }

    return(
        <div className="container">
            <div className='mt-4'><h4>REGISTER</h4></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Register
                    </button>
                    <Link to="../login" className="btn btn-link">Cancel</Link>
                </form>
        </div>
    );
}

export default Register;