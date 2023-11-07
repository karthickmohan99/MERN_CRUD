import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import { BasicSchema } from "../schemas/index";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const [errMessage, setErrmessage] = useState("");
    const navigate = useNavigate();
    const onSubmit = (values, actions) => {

        console.log(values, "Values");
        console.log(actions, "submitted")
        axios.post(`${import.meta.env.VITE_baseURL}/auth`, values)
            .then(res => {
                console.log(res.data.message, "res-----------------")
                navigate('/login');

                actions.resetForm();
            }).catch((err) => {
                console.log(err.response.data.error);
                setErrmessage(err.response.data.error);
                actions.resetForm();

                alert('An error occured,please check console')
            })



    }


    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            email: "",
            age: "",
            password: "",
            confirmPassword: "",
        },

        validationSchema: BasicSchema,
        onSubmit,
    })


    return (
        <>
            <h1 className='text-3xl my-4'>Signup</h1>
            <form onSubmit={handleSubmit} className="form-horizontal border-2 border-sky-400 rounded-xl w-[500px] p-8 mx-auto" autoComplete="off">
                {errMessage && <div className='alert alert-danger' role='alert'>{errMessage}</div>}
                <label className='mr-4  text-xl text-gray-500' htmlFor="email">Name</label>
                <input value={values.name}
                    onChange={handleChange}
                    type="text"
                    className={`form-control ${errors.name && touched.name ? "input-error" : ""}`}
                    id="name"
                    placeholder="Enter name" onBlur={handleBlur} />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
                <label className='mr-4 mt-4 text-xl text-gray-500' htmlFor="email">Email address</label>
                <input value={values.email}
                    onChange={handleChange}
                    type="email"
                    className={`form-control ${errors.email && touched.email ? "input-error" : ""}`}
                    id="email"
                    placeholder="Enter email" onBlur={handleBlur} />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}

                <label className='mr-4 mt-4 text-xl text-gray-500' htmlFor="age">Age</label>
                <input value={values.age}
                    onChange={handleChange}
                    type="number"
                    className={`form-control ${errors.age && touched.age ? "input-error" : ""}`}
                    id="age"
                    placeholder="Enter age" onBlur={handleBlur} />
                {errors.age && touched.age && <p className="error">{errors.age}</p>}
                <label className='mr-4 mt-4 text-xl text-gray-500' htmlFor="password">Password</label>
                <input value={values.password}
                    onChange={handleChange}
                    type="password"
                    className={`form-control ${errors.password && touched.password ? "input-error" : ""}`}
                    id="password"
                    placeholder="Enter password" onBlur={handleBlur} />
                {errors.password && touched.password && <p className="error">{errors.password}</p>}
                <label className='mr-4 mt-4 text-xl text-gray-500' htmlFor="confirmPassword">Confirm Password</label>
                <input value={values.confirmPassword}
                    onChange={handleChange}
                    type="password"
                    className={`form-control ${errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}`}
                    id="confirmPassword"
                    placeholder="Confirm Password" onBlur={handleBlur} />
                {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                <button disabled={isSubmitting} type="submit" className="mt-2 btn btn-primary">Submit</button>
                <a className='mx-2 mt-8' href='/login'>Allready had a account</a>
            </form>

        </>
    )
}

export default Signup;