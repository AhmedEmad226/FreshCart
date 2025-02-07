import { useContext } from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../../assets/CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {


  return <>
  
    <MainSlider/>
    <CategorySlider/>
    <RecentProducts/>
  
  </>
}
