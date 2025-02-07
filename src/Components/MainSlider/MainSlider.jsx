import React from 'react'
import img1 from '../../assets/images/blog-img-1.jpeg'
import img2 from '../../assets/images/blog-img-2.jpeg'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
  
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
      };
  
  return <>
    <div className="flex">
        <div className="w-3/4">
            <Slider {...settings}>
				<img className='w-full object-cover h-[300px]' src={img1} />
				<img className='w-full object-cover h-[300px]' src={img2} />
				<img className='w-full object-cover h-[300px]' src={slider1} />
    		</Slider>
        </div>
        
        <div className="w-1/4">
          <img className='w-full object-cover object-center h-[150px]' src={slider2} />
          <img className='w-full object-cover object-center h-[150px]' src={slider3} />
        </div>
    </div>
  </>
}
