import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { HashLoader } from 'react-spinners';
import Loading from '../Loading/Loading';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {

	const {id} = useParams()
	const [loading, setLoading] = useState(true)
	const [product, setProduct] = useState(null)

	let {addProductToCart} = useContext(CartContext)

	const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
		accessibility: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 3000
  };


    async function getProduct() {

			try{
				const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
				setProduct(response.data.data)
				setLoading(false)
			}

			catch(e){
				setLoading(false)
				console.log(e);
				toast.error(e)
			}
    }

    useEffect(()=>{
        getProduct()
    },[])

  return <>

		{loading? <div className="flex justify-center"> <Loading/> </div> : 
		

		<div className="w-full text-center mx-auto px-10 lg:flex lg:justify-between gap-x-7">
			<div className="w-1/2 lg:w-1/4">
			<Slider {...settings}>
				{product.images.map((image, index)=> <img src={image} key={index} className=' lg:w-full'/>)}
    		</Slider>
			</div>			
			
			
			<div className="w-full lg:w-3/4 ps-7">
				<h3 className='py-4 text-green-500'>{product.category.name}</h3>
				<h2>{product.title}</h2>
				<p className='py-4 text-gray-500'>{product.description}</p>
				<h4 className='py-4 flex flex-wrap justify-between'> <span>{product.price} EGP</span>  <span> <i className='fas fa-star text-[gold]'></i> {product.ratingsAverage}</span></h4>
				<button onClick={()=> addProductToCart(id)} className='w-full duration-500 bg-[var(--main-color)] text-white hover:bg-[#319928]'>+ Add to cart</button>
			</div>
		</div>
}

  </>
}
