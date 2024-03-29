import React, { useEffect } from 'react'
import styles from './styles.module.css';
import { Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginAsync } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

interface  LoginData{
    status:boolean,
    message:string,
    token:string
}

interface AuthState {
    user: object;
    loading: boolean;
    status: string;
    isUser: boolean;
  }

const Login: React.FC = () => {
   
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch>();
    const { user , loading ,status , isUser} = useSelector((state: { auth: AuthState }) => state.auth);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required')
      });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit: async (values) => {
          
            try {
                axios.defaults.withCredentials = true;
                await dispatch(LoginAsync(values));
                
            } catch (error) {
                const { status, data} = (error as Error).response;
           
            }
           
        },
        validationSchema: validationSchema,
    })
    
  
    useEffect(() => {
      if(isUser && status) navigate('/')
    }, [isUser,status,navigate])
    
    return (
        <div className={styles.sign_up}>
            <h3>LOGIN</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_element}>
                    <label htmlFor="">EMAIL</label>
                    <Input id='email' value={values.email} onChange={handleChange}  onBlur={handleBlur} />
                    {errors.email && touched.email && <div className={styles.form_error_message}> {errors.email} </div>}
                </div>

                <div className={styles.form_element}>
                    <label htmlFor="">PASSWORD</label>
                    <Input.Password autoComplete='off' id='password' value={values.password} onChange={handleChange}  onBlur={handleBlur} />
                    {errors.password && touched.password && <div className={styles.form_error_message}> {errors.password} </div>}
                </div>

                <div>
                    <button type='submit' className={styles.sign_up_button} >LOGIN</button>
                </div>
            </form>
            <div>Don't have an account? <Link to={'/sign'}>Sign Up</Link> </div>
        </div>
    )
}

export default Login