import { Link } from 'react-router-dom';
import './login.css';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
//import { useDispatch } from 'react-redux';

import { authActions } from '../../../redux/authSlice';
import { actionAuth } from '../../../zustand/authZustand';

//import {Alert} from '../../shared/alert/alertLogin';
//import { useSelector, useDispatch } from 'react-redux';
//import { changeEmail } from '../../../redux/userSlice';

function Login() {
    //const dispatch = useDispatch();
    //const user = useSelector((state) => state.user);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        //return dispatch(authActions.login({ username, password }));
        actionAuth.login({username, password})
    }



    return (
        <div>
            <div className="row m-0 p-0">
                <div className="col-4">
                    <div className='cintainer'>
                        <div className='text-center mt-5'><h4>LOGIN</h4></div>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                Login
                            </button>
                            <Link to="../register" className="btn btn-link">Register</Link>
                        </form>
                    </div>
                </div>
                <div className="col-8" id="content-img-login">

                </div>
            </div>
        </div>
    );
}

export default Login;