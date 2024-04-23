import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/Logo.png";
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/userContext';
import axios from 'axios';
import { useStripe } from '@stripe/react-stripe-js';

const Order = () => {
    const { cartItems, removeItem, addToCart } = useCartContext()
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    const taxPrice = itemsPrice * 0.14.toFixed(2);
    const taxpriceLength = taxPrice.toFixed(2)
    const shippingPrice = itemsPrice > 2000 ? 0 : 20
    const totalPrice = itemsPrice + shippingPrice + parseInt(taxpriceLength)

    const {user}= useUserContext()
    const stripe = useStripe()


    const handleFinish = async() =>{
        
        try{
            const orderItems = cartItems.map(item => ({
                food:item._id,
                qty:item.qty
            }))
            const res = await axios.post(`http://localhost:8000/api/v1/order/order`,{
                user:user?.user._id,
                items:orderItems,
                totalAmount: totalPrice,
                
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
          
            if(res.data.success){
                const result = await stripe.redirectToCheckout({
                    sessionId:res.data.sessionId
                })
                toast.success(res.data.message)
            } else{
                toast.error(res.data.message)
            }
        } catch(error){
            console.log(error);
            toast.error('Something went wrong')
        }
    }




    return (
        <div className=" h-screen ">
            <div
                className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-[28rem] mx-auto flex flex-col items-center rounded-md px-8 py-5"

            >
                <NavLink to="/">
                    <img src={logo} alt="" className="logo text-center h-28 mx-auto cursor-pointer mb-6" />
                </NavLink>

                <div className='text-xl text-[#2e2e2e] mb-3'>
                    Items Price : <span className='text-[#f54748] '>
                        ₹ {itemsPrice}
                    </span>
                </div>
                <div className='text-xl text-[#2e2e2e] mb-3'>
                    Tax Price : <span className='text-[#f54748] '>
                        ₹ {taxpriceLength}
                    </span>
                </div>
                <div className='text-xl text-[#2e2e2e] mb-3'>
                    Shipping Price : <span className='text-[#f54748] '>
                        ₹ {shippingPrice}
                    </span>
                </div>
                <div className='text-xl text-[#2e2e2e] mb-3'>
                    Total Price : <span className='text-[#f54748] '>
                        ₹ {totalPrice}
                    </span>
                </div>

                <button onClick={handleFinish} className="bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center">

                    Pay ₹ {totalPrice}
                </button>
                <ToastContainer />
            </div>

        </div>
    )
}

export default Order
