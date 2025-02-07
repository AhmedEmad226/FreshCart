import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let CartContext = createContext()


export default function CartContextProvider({children}){

	const [cart, setCart] = useState(null)

	async function addProductToCart(productId) {
		try{
			const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId: productId}, {
				headers:{
					token: localStorage.getItem('userToken')
				}
			})

			setCart(data)
			console.log(data);
			
			toast.success(data.message)
		}

		catch(e){
			toast.error(e.message)
		}

	}

	async function deleteCartProduct(productId) {
		try{
			const {data} = await axios.delete
			(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
				headers:{
					token: localStorage.getItem('userToken')
				}
			})

			setCart(data)
			
			toast.success(data.message)
		}

		catch(e){
			toast.error(e.message)
		}

	}

	async function getCart() {
		try{
			const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
				headers:{
					token: localStorage.getItem('userToken')
				}
			})
			setCart(data);
		}

		catch(e){
			console.log(e.message)
		}

	}

	async function updateProductToCart(productId, count) {

		try{
			let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
				count
			},{
					headers:{
						token:localStorage.getItem('userToken')
					}
			})
			setCart(data)
			toast.success(data.status)
		}
		catch(e){
			console.log(e)
		}
	}


	useEffect(() => {
		const userToken = localStorage.getItem('userToken');
		if (userToken) getCart();
	}, []);
	


	return <CartContext.Provider value={{addProductToCart, cart, updateProductToCart, deleteCartProduct}}>
		{children}
	</CartContext.Provider>

}