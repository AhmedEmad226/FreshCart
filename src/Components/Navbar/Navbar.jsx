import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { useSelector } from 'react-redux'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  let {userToken, setUserToken} = useContext(userContext)
  const navigate = useNavigate()


  let {cart} = useContext(CartContext)


  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }


  return <>


<nav className="bg-gray-200 fixed top-0 w-full z-50">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* Mobile menu button*/}
        <button onClick={()=>{setIsOpen(!isOpen)}} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open main menu</span>
          {/*
      Icon when menu is closed.

      Menu open: "hidden", Menu closed: "block"
    */}
          <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {/*
      Icon when menu is open.

      Menu open: "block", Menu closed: "hidden"
    */}
          <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex shrink-0 items-center">
          <img className="h-8 w-auto" src={logo} alt="Your Company" />
        </div>
        <div className="hidden sm:ml-6 sm:block">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}

            {
              userToken? localStorage.getItem('userToken') && <div className="flex space-x-1 justify-center">
                <NavLink to={'home'} className="font-light rounded-md px-1 py-2 text-sm capitalize text-gray-400 hover:text-gray-600">home</NavLink>
                <NavLink to={'wishList'} className="font-light rounded-md px-1 py-2 text-sm capitalize text-gray-400 hover:text-gray-600">wish list</NavLink>
                <NavLink to={'products'} className="font-light rounded-md px-1 py-2 text-sm capitalize text-gray-400 hover:text-gray-600">products</NavLink>
                <NavLink to={'categories'} className="font-light rounded-md px-1 py-2 text-sm capitalize text-gray-400 hover:text-gray-600">categories</NavLink>
                <NavLink to={'brands'} className="font-light rounded-md px-1 py-2 text-sm capitalize text-gray-400 hover:text-gray-600">brands</NavLink>
                <p onClick={()=> logOut()} className="font-light rounded-md cursor-pointer p-0 px-1 py-2 text-end text-sm capitalize text-red-400 hover:text-red-800 opacity-75">LogOut</p>
            </div> : !userToken && <div className="flex space-x-1 justify-center">
              <NavLink to={''} className="font-light rounded-md px-1 py-2 text-sm capitalize text-gray-400 hover:text-gray-600">Register</NavLink>
              <NavLink to={'/login'} className="font-light rounded-md px-1 py-2 text-sm capitalize text-gray-400 hover:text-gray-600">Login</NavLink>
              </div>
            }


          


        </div>
      </div>
      <div className="absolute inset-y-0 right-0 lg:flex items-center pr-2 hidden sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <i className='fab fa-facebook relative rounded-full bg-transparent p-1 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'></i>
        <i className='fab fa-linkedin relative rounded-full bg-transparent p-1 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'></i>
        <i className='fab fa-twitter relative rounded-full bg-transparent p-1 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'></i>
        <i className='fab fa-youtube relative rounded-full bg-transparent p-1 text-gray-400 hover:text-gray-600 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'></i>

        
        <button type="button" className="relative rounded-full bg-transparent group p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden hover:bg-[var(--main-color)]">
            <NavLink to={'cart'} className='fas fa-cart-shopping p-2 group-hover:text-white hover:text-white'></NavLink>
            {cart && cart.numOfCartItems > 0 && (
  <div className="w-5 h-6 rounded-full group-hover:bg-slate-800 bg-[var(--main-color)] absolute -top-2 -right-1 text-white flex items-center justify-center">
    {cart.numOfCartItems}
  </div>
)}
        </button>

      </div>
    </div>
  </div>
  {/* Mobile menu, show/hide based on menu state. */}
  <div className={`${isOpen? 'sm:hidden' : 'hidden'}`} id="mobile-menu">
    <div className="space-y-1 px-2 pt-2 pb-3">
      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          {
          userToken? <>
            <NavLink to={'home'} className="block rounded-md focus:bg-gray-900 px-3 py-2 text-base font-medium text-black focus:text-white">home</NavLink>
            <NavLink to={'cart'} className="block rounded-md focus:bg-gray-900 px-3 py-2 text-base font-medium text-black focus:text-white">cart</NavLink>
            <NavLink to={'wishList'} className="block rounded-md focus:bg-gray-900 px-3 py-2 text-base font-medium text-black focus:text-white">wish list</NavLink>
            <NavLink to={'products'} className="block rounded-md focus:bg-gray-900 px-3 py-2 text-base font-medium text-black focus:text-white">products</NavLink>
            <NavLink to={'categories'} className="block rounded-md focus:bg-gray-900 px-3 py-2 text-base font-medium text-black focus:text-white">categories</NavLink>
            <NavLink to={'brands'} className="block rounded-md focus:bg-gray-900 px-3 py-2 text-base font-medium text-black focus:text-white">brands</NavLink>
          </> : <>
          <NavLink to={'register'} className="block rounded-md focus:bg-gray-900 px-3 py-2 text-base font-medium text-black focus:text-white">register</NavLink>
          <NavLink to={'login'} className="block rounded-md focus:bg-gray-900 px-3 py-2 text-base font-medium text-black focus:text-white">login</NavLink>
          </>
}


    </div>
  </div>
</nav>




  </>
}
