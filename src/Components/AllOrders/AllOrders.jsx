import React, { useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { userContext } from '../../context/UserContext';

export default function AllOrders() {
  const { userToken } = useContext(userContext); 
  
  useEffect(() => {
    if (userToken) { 
      const decoded = jwtDecode(userToken);
    }
  }, [userToken]);

  return (
    <>
      <h1>All Orders</h1>
    </>
  );
}
