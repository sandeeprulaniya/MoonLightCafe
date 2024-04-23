import React, { useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { useFoodContext } from '../context/foodContext'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';

const Menu = () => {
    const { Food, setFood } = useFoodContext();
    const [active, setActive] = useState(0)
    const [value, setValue] = useState('all')
    const catagory = [
        {
            id: 0,
            name: 'All',
            value: "all"
        },
        {
            id: 1,
            name: 'Desert',
            value: "Desert"
        },
        {
            id: 2,
            name: 'Drinks',
            value: "Drinks"
        },
        {
            id: 3,
            name: 'Chicken',
            value: "Chicken"
        },
        {
            id: 4,
            name: 'Pizza',
            value: "Pizza"
        },
        {
            id: 5,
            name: 'Fruits',
            value: "Fruits"
        },
       
    ]
    const handleButton = (btn) => {
        setValue(btn.value);
        setActive(btn.id)
    }
    const params = useParams();
    const getFoods = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/food/getAllFoods?category=${value}`)
            if (res.data.success) {
                console.log(res.data.data.food)
                setFood(res.data.data.food)
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getFoods()
    }, [value])

    const {addToCart} = useCartContext()
    
    return (
        <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
            <div className="container mx-auto py-[2vh]">
                <div className="flex flex-wrap justify-center mb-8 gap-5">
                    {catagory?.map((btn) => (
                        <button className={active === btn.id ? "bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" : "bg-white active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-[#F54748]"} onClick={() => handleButton(btn)}>{btn.name}</button>
                    ))}
                </div>
                <div className="grid py-6 lg:grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    {Food?.map((curElm) => ( 
                        <div key={curElm.id} className="food-card bg-red-500/10  rounded-xl  flex flex-col cursor-pointer items-center p-5">
                            <div className="relative mb-3">
                                <Link to={`/menu/${curElm?._id}`}>
                                <img src={curElm.foodImage} alt="" srcset="" />
                                </Link>
                                <div className="absolute top-2 left-2">
                                    <button className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative">
                                        <FaHeart className='absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                                    </button>
                                </div>


                                <div className="absolute bottom-2 right-2">
                                    <button className=" shadow-sm bottom-4 border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative">
                                        <div className=" absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">₹{curElm?.price}</div>
                                    </button>
                                </div>


                            </div>

                            <div className="flex gap-4 items-center">
                                <p className="text-xl text-center font-bold text-[#f54748]">
                                    {curElm.name}
                                </p>
                                <div className="flex text-sm space-x-2 cursor-pointer">
                                    <span className="font-normal text-[#fdc55e]">4</span>
                                    <FaStar size={16} className='text-[#fdc55e]' />
                                    <span className="font-medium">({curElm?.reviews?.length})</span>
                                </div>
                            </div>
                            <button onClick={()=>addToCart(curElm)} className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white"> Add to Cart </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Menu

