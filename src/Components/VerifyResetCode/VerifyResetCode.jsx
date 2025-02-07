import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerifyResetCode() {
  
  const [apiError, setApiError] = useState(null)
	const [apiMessage, setApiMessage] = useState(null)
	const [loading, setLoading] = useState(null)

	const navigate = useNavigate()

  async function VerifyCode({resetCode}){
    try{
      setLoading(true)
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {resetCode})
      setLoading(null)
      navigate('/resetpassword')
    }catch(e){
      console.log(e)
      setApiError(true)
      setLoading(null)
      setApiMessage(e.response.data.message)
    }
  }

    const formik = useFormik({
      initialValues:{
        resetCode: '',
      },
      onSubmit: VerifyCode,
    })

  return <>

    <div className="flex justify-center">
      <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <span className="font-medium">we have sent a verify code to you, Enter it here to reset the password</span>
      </div>
    </div>
  
    <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>


  <div className="relative z-0 w-full mb-5 group">
      <input autoFocus max={6} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.resetCode} type="text" name="resetCode" id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter the code</label>
    </div>

  {
    apiError && <div className="p-2 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{apiMessage}</div>
  }
    
    {
      !loading && <button type="submit" className="text-white bg-[#0aad0a] hover:bg-[#0aad0a] focus:ring-4 focus:outline-none focus:ring-[#0aad0a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0aad0a] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500">Submit</button>
    }

    {
      loading && <button type="button" className="text-white bg-[#0aad0a] hover:bg-[#0aad0a] focus:ring-4 focus:outline-none focus:ring-[#0aad0a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0aad0a] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500"> <i className='fas fa-spinner fa-spin'></i> </button>
    }
    </form>
  
  </>
}
