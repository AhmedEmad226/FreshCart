import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

export default function WishList() {

  const [isLoading, setIsLoading] = useState(true)
  const {addProductToCart} = useContext(CartContext)
  const [wishList, setWishList] = useState(null)


  async function getWishList() {
    try{

      const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers:{
          token: localStorage.getItem('userToken')
        }}
      )
      console.log(data);
      setWishList(data)
      setIsLoading(false)
    }catch(e){
      setIsLoading(false)
      console.log(e)
    }

  }
  useEffect(()=>{
    getWishList()
  },[])

  return <>

{ isLoading ? <div className="flex justify-center my-32 w-full"><Loading/></div> :
	<div className="flex flex-wrap py-8 gap-y-4 w-full px-6">
		{
			wishList?.data.map((product)=>{
				return <div key={product._id} className="product w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 overflow-hidden px-5 py-2 group relative">

					<Link to={`/productdetails/${product._id}`}>
					<img className='w-full' src={product.imageCover} alt={product.title} />
					<h4 className='text-[var(--main-color)]'>{product.category.name}</h4>
					<h4 className='text-xl'>{product.title.split(' ', 2).join(' ')}</h4>
					<h4 className='flex flex-wrap justify-between'> <span>{product.price} EGP</span>  <span> <i className='fas fa-star text-[gold]'></i> {product.ratingsAverage}</span></h4>
					</Link>
					<button onClick={()=> addProductToCart(product._id)} className='w-full bg-[var(--main-color)] text-white lg:translate-y-32 translate-y-0 lg:group-hover:translate-y-0 duration-500'>+ Add to cart</button>
				</div>
			})
		}
	</div>
}

  </>
}
