import React, { useContext } from 'react'
import { userContext } from '../../context/UserContext'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({children}) {


  if(localStorage.getItem('userToken')){
    return children
  }else{
    return <Navigate to={'register'}/>
  }

}
