import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/UserContext'

export default function Register() {

  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [apiMessage, setApiMessage] = useState(null)

  let {setUserToken} = useContext(userContext)

  let navigate = useNavigate()
  
  async function register(values){

  
    try{
      setLoading(true)
      setApiError(null)
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      setUserToken(data.token)
      localStorage.setItem('userToken', data.token)

      navigate('login')

    }

    catch(e){
      setApiError(true)
      console.log(e)
      setApiMessage(e.response.data.message)
    }

    finally{
      setLoading(null)
    }
  
  }

  
  let validationSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'min is 3').max(15, 'max is 15'),
    email: yup.string().required('Email is required').email('email is invalid'),
    password: yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*[@#%&!$^*])[A-Za-z0-9@#%&!$^*]{5,20}$/, 'invalid password Ex(Ahmed@226)'),
    rePassword: yup.string().required('RePassword is required').oneOf([yup.ref('password')], 'does not match Password above'),
    phone: yup.string().required('Phone is required').matches(/^01[01259]\d{8}$/, 'invalid phone')
  })
  
  const formik = useFormik({
    initialValues:{
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: register,
    validationSchema,
  })
  

  return <>

  <div className="flex justify-center">
    <h1 className='hover:bg-slate-900 my-3 rounded-xl underline hover:text-white w-fit p-3 text-3xl text-slate-900 bg-white duration-200'>Register</h1>
  </div>
  <form onSubmit={formik.handleSubmit} className="w-4/5 sm:w-1/2 mx-auto">
  {
    apiError && <div className="p-2 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{apiMessage}</div>
  }

    <div className="relative z-0 w-full mb-5 group">
      <input autoFocus type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your name</label>
    </div>

    {formik.errors.name && formik.touched.name && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.name}
    </div>}
    
    <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your email</label>
    </div>
    
    {formik.errors.email && formik.touched.email && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}
    </div>}

    <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password</label>
    </div>
    
    {formik.errors.password && formik.touched.password && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.password}
    </div>}

    <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your rePassword</label>
    </div>

    {formik.errors.rePassword && formik.touched.rePassword && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.rePassword}
    </div>}
    
    <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
    </div>

    {formik.errors.phone && formik.touched.phone && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.phone}
    </div>}

      {
        !loading && <button type="submit" className="text-white bg-[#0aad0a] hover:bg-[#0aad0a] focus:ring-4 focus:outline-none focus:ring-[#0aad0a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0aad0a] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500">Submit</button>
      }

      {
        loading && <button type="button" className="text-white bg-[#0aad0a] hover:bg-[#0aad0a] focus:ring-4 focus:outline-none focus:ring-[#0aad0a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0aad0a] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500"> <i className='fas fa-spinner fa-spin'></i> </button>
      }

    <h1 className='text-gray-500 text-base text-center'>Have an accoun alreadyt?<Link className='text-sky-600' to={'/login'}>Login</Link> </h1>
  </form>

  </>

}
