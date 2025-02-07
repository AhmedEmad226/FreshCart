import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/UserContext'

export default function Login() {
  
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(null)
  const [apiMessage, setApiMessage] = useState(null)

  let {setUserToken} = useContext(userContext)


  let navigate = useNavigate()
  
  async function resetPassword(values){

  
    try{
      setLoading(true)
      setApiError(null)
      const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', values)
      // setApiMessage('Password Updated')
      console.log(data);
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



  let validationSchema = yup.object({

    currentPassword: yup.string().required('currentPassword is required'),
    password: yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*[@#%&!$^*])[A-Za-z0-9@#%&!$^*]{5,20}$/, 'invalid password Ex(Ahmed@226)'),
    rePassword: yup.string().required('RePassword is required').oneOf([yup.ref('password')], 'does not match Password above')
  })

  const formik = useFormik({
    initialValues:{
      currentPassword: '',
      password: '',
      rePassword: ''
    },
    onSubmit: resetPassword,
    validationSchema
  })





  return <>
  
  <div className="flex justify-center">
    <h1 className='my-3 rounded-xl w-fit p-3 text-3xl text-slate-900 bg-white duration-200'>Reset Password</h1>
  </div>

  {
    apiError && <div className="p-2 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{apiMessage}</div>
  }

  <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>


  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="currentPassword" id="currentPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="currentPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your currentPassword</label>
    </div>

    {formik.errors.currentPassword && formik.touched.currentPassword && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.currentPassword}
    </div>}


  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your password</label>
    </div>

    {formik.errors.password && formik.touched.password && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.password}
    </div>}


  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your rePassword</label>
    </div>

    {formik.errors.rePassword && formik.touched.rePassword && <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.rePassword}
    </div>}

    {
      !loading && <button type="submit" className="text-white bg-[#0aad0a] hover:bg-[#0aad0a] focus:ring-4 focus:outline-none focus:ring-[#0aad0a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0aad0a] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500">Submit</button>
    }

    {
      loading && <button type="button" className="text-white bg-[#0aad0a] hover:bg-[#0aad0a] focus:ring-4 focus:outline-none focus:ring-[#0aad0a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0aad0a] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500"> <i className='fas fa-spinner fa-spin'></i> </button>
    }

  </form>
  
  </>
}
