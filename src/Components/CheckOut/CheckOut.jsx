import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function CheckOut() {
  
  // const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(null)
  // const [apiMessage, setApiMessage] = useState(null)

  let {cart} = useContext(CartContext)


  let navigate = useNavigate()
  
  async function checkOut(shippingAddress){

  
    try{
      setLoading(true)
      const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,{
        shippingAddress
      },{
        headers:{
          token: localStorage.getItem('userToken')
        }
      })
      setLoading(false)
      toast.success(data.status)
      console.log(data)
      location.href = data.session.url

    }

    catch(e){
      setLoading(false)
      console.log(e)
      toast.error(e)
    }

    finally{
      setLoading(null)
    }
  
  }



  const formik = useFormik({
    initialValues:{
      city: '',
      details: '',
      phone: ''
    },
    onSubmit: checkOut,
  })





  return <>
  
  <div className="flex justify-center">
    <h1 className='hover:bg-slate-900 my-10 rounded-xl hover:text-white w-fit p-1 text-3xl text-white bg-[var(--main-color)] duration-200'>checkOut</h1>
  </div>


  <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>


  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>
    </div>


  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="detail" id="detail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="detail" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your detail</label>
    </div>


  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0aad0a] focus:outline-none focus:ring-0 focus:border-[#0aad0a] peer" placeholder=" " />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0aad0a] peer-focus:dark:text-[#0aad0a] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>
    </div>



    {
      !loading && <button type="submit" className="text-white bg-[#0aad0a] hover:bg-[#0aad0a] focus:ring-4 focus:outline-none focus:ring-[#0aad0a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0aad0a] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500">Order</button>
    }

    {
      loading && <button type="button" className="text-white bg-[#0aad0a] hover:bg-[#0aad0a] focus:ring-4 focus:outline-none focus:ring-[#0aad0a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#0aad0a] dark:hover:bg-[#2b8d2b] dark:focus:ring-green-500"> <i className='fas fa-spinner fa-spin'></i> </button>
    }
  </form>
  
  </>
}
