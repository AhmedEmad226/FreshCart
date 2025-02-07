import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function CategorySlider() {

	const [categories, setCategories] = useState([])

	const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
		accessibility: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
		]
  };

	async function getCatagories() {
		const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
		setCategories(data.data)
	}

	useEffect(()=>{
		getCatagories()
	},[])
  return <>
  
	<Slider {...settings} className=' mx-6'>
		{categories.map((category, index)=> <div key={index} className='my-3'>
			<img src={category.image} alt={category.name} className='w-full h-[200px] object-cover object-top'/>
			<p>{category.name}</p>
		</div>)}
  </Slider>

  </>
}
