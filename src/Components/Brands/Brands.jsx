import React, { useEffect } from 'react'
import style from './Brands.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../Redux/store'
import { brandsReducer, getBrands } from '../../Redux/brandsSlice'
import Loading from '../Loading/Loading'


export default function Brands() {

  const {isLoading, brands} = useSelector((store)=>store.brands)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getBrands())
  },[])

  console.log(brands);
  
  
  return <>

  {isLoading ? <Loading/> : <div className='flex flex-wrap justify-center'>

    {
      brands.map((brand)=>{ return <div className="item flex-col text-slate-950 p-5 w-full sm:w-1/2 lg:w-1/3 flex justify-center" key={brand._id}>
          <div className="imageCover"><img className='w-full' src={brand.image} alt={brand.name} /></div>
          <h2 className='text-center text-neutral-700'>{brand.name}</h2>
        </div>
      })
    }
    
    </div>}


  </>
}