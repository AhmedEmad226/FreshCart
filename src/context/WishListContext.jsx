import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let wishListContext = createContext()

export default function WishListContextProvider({children}){

  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'))
  const [wishList, setWishList] = useState(null)

  async function addToWishList(productId) {
    try{
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{
        headers:{
          token: userToken
        }
      })
      setWishList(response.data)
      toast.success(response.data.message)
      console.log(wishList)
    }

    catch(e){
      toast.error(e.message)
    }
  }



  return<>
  
  <wishListContext.Provider value={{addToWishList}}>
    {children}
  </wishListContext.Provider>
  
  </>

}