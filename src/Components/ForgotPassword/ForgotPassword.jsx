import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  
	const [apiError, setApiError] = useState(null)
	const [apiMessage, setApiMessage] = useState(null)
	const [loading, setLoading] = useState(null)

	const navigate = useNavigate()

	async function sendEmail({email}){

		try{
			setLoading(true)
			const data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {email})
			setLoading(null)
			navigate('/verifyresetcode')
		}

    catch(e){
      setApiError(true)
      setApiMessage(e.response.data.message)
    }

    finally{
      setLoading(false)
    }
	}



	let formik = useFormik({
		initialValues:{
			email: ''
		},
		onSubmit: sendEmail
	})

	
	return <>

<div className="flex justify-center">
    <h1 className='my-3 rounded-xl w-fit p-3 text-xl text-slate-900 bg-white duration-200'>insert your email to get a verify code</h1>
  </div>

<form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[var(--main-color)] focus:outline-none focus:ring-0 focus:border-[var(--main-color)] peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[var(--main-color)] peer-focus:dark:text-[var(--main-color)] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
    </div>

	{
    apiError && <div className="p-2 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{apiMessage}</div>
  }

  {
    !loading && <button type="submit" className="text-white bg-[var(--main-color)] hover:bg-[var(--main-color)] focus:ring-4 focus:outline-none focus:ring-[var(--main-color)] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[var(--main-color)] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500">Submit</button>
  }
  {
    loading && <button type="button" className="text-white bg-[var(--main-color)] hover:bg-[var(--main-color)] focus:ring-4 focus:outline-none focus:ring-[var(--main-color)] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[var(--main-color)] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500"> <i className='fas fa-spinner fa-spin'></i> </button>
  }
</form>


</>
}
