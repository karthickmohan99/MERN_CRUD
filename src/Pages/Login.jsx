import axios from 'axios';
import { useFormik } from "formik";
import { LoginSchema } from "../schemas/index";
import{useNavigate}  from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import Token from '../TokenService/Token';
import { Link } from 'react-router-dom';


const Login=()=>{
    const [errMessage,setErrmessage]=useState("");
    const navigate = useNavigate();
    const onSubmit =(values,actions)=>{
        
        console.log(values,"Values");
        console.log(actions,"submitted")
        axios.post(`${import.meta.env.VITE_baseURL}/auth/login`,values)
        .then(res=>{
            console.log(res,"loginres")
             console.log(res.data.token,"res-----------------")
             console.log(res.data.refreshToken,"refresh-----------------")
            
             Token.setAccessToken(res.data.token);
             Token.setRefreshToken(res.data.refreshToken);
            navigate('/home');
        actions.resetForm();
        }).catch((err)=>{
            actions.resetForm();
          console.log(err.response.data.error,"----loginerror---");
          setErrmessage(err.response.data.error)
          
          
            })
        
        
    
    }
    
    
    const {values,errors,touched,isSubmitting,handleChange,handleBlur,handleSubmit}= useFormik({
        initialValues:{
            
            email:"",
            password:"",
            
        },

        validationSchema:LoginSchema,
        onSubmit,
    })

    console.log(errors)
    return(
        <>
         <h1 className='text-3xl my-4'>Login</h1>
        <form onSubmit={handleSubmit} className="form-horizontal border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto" autoComplete="off">
        {errMessage && <div className='alert alert-danger' role='alert'>{errMessage}</div>}
        <label className='mr-4  text-xl text-gray-500' htmlFor="email">Email address</label>
         <input value={values.email}
         onChange={handleChange}
         type="email" 
         className={`form-control ${errors.email && touched.email?"input-error":""}`} 
         id="email"  
         placeholder="Enter email" onBlur={handleBlur}/>
         {errors.email && touched.email && <p className="error">{errors.email}</p>}

         
         <label className='mr-4 mt-4 text-xl text-gray-500' htmlFor="password">Password</label>
         <input value={values.password}
         onChange={handleChange}
         type="password" 
         className={`form-control ${errors.password && touched.password?"input-error":""}`}  
         id="password"  
         placeholder="Enter password" onBlur={handleBlur} />
         {errors.password && touched.password && <p className="error">{errors.password}</p>}

         <button disabled={isSubmitting} type="submit" className="mt-2 btn btn-primary">Submit</button>
         {errMessage === "email does not exists" && 
         <Link to="/signup">
         <button className="mt-2 ml-2 btn btn-warning">please Register</button>
           </Link>}
        </form>
        
        </>
    )
}


export default Login;