import * as yup from 'yup';

const passwordRules = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/;
//min 5 characters 1uppercase 1 lowercase 1 number

export const BasicSchema = yup.object().shape({
    name:yup.string().required("Required"),
    email:yup.string().email("PLease enter a valid email").required("Required"),
    age:yup.number().positive().integer().required("Required"),
    password:yup
    .string()
    .min(5)
    .matches(passwordRules,{message:"Password must contain at least 1 uppercase, 1 lowercase and 1 number"})
    .required("Required"),

    confirmPassword:yup.string().oneOf([yup.ref('password'),null], "Passwords don't match")
    .required("Required")

})


export const LoginSchema = yup.object().shape({
    
    email:yup.string().email("PLease enter a valid email").required("Required"),
    
    password:yup
    .string()
    .min(5)
    .matches(passwordRules,{message:"Password must contain at least 1 uppercase, 1 lowercase and 1 number"})
    .required("Required"),

    

})
