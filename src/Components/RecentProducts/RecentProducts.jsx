import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { CartContext } from '../../context/CartContext'
import { useQuery } from '@tanstack/react-query'
import { wishListContext } from '../../context/WishListContext'

export default function RecentProducts() {

	const [products, setProducts] = useState([])
	let {addProductToCart} = useContext(CartContext)
  
	// async function getProducts() {

	// 	try{
	// 		setLoading(true)
	// 		const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
	// 		setProducts(data.data)
	// 		setLoading(false)
	// 	}

	// 	catch(e){
	// 		setLoading(false)
	// 		return <h1 className='bg-red-400 text-red-600 px-4 py-3 text-center w-fit'>{e}</h1>
	// 	}
	// }

	// useEffect(()=>{
	// 	getProducts()
	// },[])


	let {addToWishList} = useContext(wishListContext)

	function getProducts(){
		return axios.get('https://ecommerce.routemisr.com/api/v1/products')
	}

	let {data, isLoading, isFetching, isError} = useQuery({
		queryKey:['recentProducts'],
		queryFn: getProducts,
		refetchOnMount:false
	})

	

return <>

{ isLoading ? <div className="flex justify-center my-auto align-middle absolute w-full h-1/3"><Loading/></div> :
	<div className="flex flex-wrap py-8 gap-y-4 w-full px-6">
		{
			data?.data.data.map((product)=>{
				return <div key={product.id} className="product w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 overflow-hidden px-3 py-2 group relative">
					<button onClick={()=>{addToWishList(product.id)}}>
						<i className='fas fa-heart top-3 right-3 text-red-200 text-xl opacity-0 group-hover:opacity-100 duration-300 hover:drop-shadow-none hover:text-red-600 drop-shadow-md'></i>
					</button>

					<Link to={`/productdetails/${product.id}`}>
					<img className='w-full' src={product.imageCover} alt={product.title} />
					<h4 className='text-[var(--main-color)]'>{product.category.name}</h4>
					<h4 className='text-xl'>{product.title.split(' ', 2).join(' ')}</h4>
					<h4 className='flex flex-wrap justify-between'> <span>{product.price} EGP</span>  <span> <i className='fas fa-star text-[gold]'></i> {product.ratingsAverage}</span></h4>
					</Link>
					<button onClick={()=> addProductToCart(product.id)} className='w-full bg-[var(--main-color)] text-white lg:translate-y-32 translate-y-0 lg:group-hover:translate-y-0 duration-500'>+ Add to cart</button>
				</div>
			})
		}
	</div>
}


  </>
}
