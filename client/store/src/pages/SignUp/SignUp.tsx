import React, { useEffect } from 'react'
import styles from './styles.module.css';
import { Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { SignUpAsync } from '../../redux/slices/authSlice';

const SignUp: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch>();
    const { createUser} = useSelector((state: { auth: AuthState }) => state.auth);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required')
      });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:''
        },
        onSubmit: async (values) => {
            console.log(values);
            
            try {
                await dispatch(SignUpAsync(values));            
            } catch (error) {
                console.log(error); 
            }
           
            // const result = await response.json();
            
        },
        validationSchema: validationSchema,
    })
    
    useEffect(() => {
      if(createUser) navigate('/login')
    }, [createUser, navigate])
    
    
    return (
        <div className={styles.sign_up}>
            <h3>Create New Account</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.form_element}>
                    <label htmlFor="">NAME</label>
                    <Input id='name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                    {errors.name && touched.name && <div className={styles.form_error_message}> {errors.name} </div>}
                </div>

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
                    <button type='submit' className={styles.sign_up_button} >  SIGN UP</button>
                </div>
            </form>

            <div>Already have an account? <Link to={'/login'}>Login</Link> </div>
        </div>
    )
}

export default SignUp