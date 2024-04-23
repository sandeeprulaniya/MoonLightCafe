import axios from "axios"
import { useEffect, useState } from "react"
import React from "react"
import { useParams } from "react-router-dom"
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import PageNavigation from "../components/PageNavigation"
const FoodPage = () =>{
    const params = useParams()
    const [foodDetails,setFoodDetails] = useState([]);
    const getFoodDetails = async () =>{
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/food/getFood/${params.id}`)
            if (res.data.success) {
                
                setFoodDetails(res.data.data.food)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getFoodDetails();
    },[])

    console.log(foodDetails);
    return (
        <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
        <div className="container mx-auto py-[2vh]">
            <PageNavigation title="Chicken katlet" />

            <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8  ">


                <div className="product_images bg-red-200/[.3] border rounded-md mb-5 p-4">
                    <img src={foodDetails.foodImage} className="w-full cursor-pointer h-[25rem]" />
                </div>


                <div className="bg-red-200/[.3] border  rounded p-8 text-black mb-5">
                    <div className="text-2xl mb-2 font-bold text-[#F54748]">
                    Name: {foodDetails.name}
                    </div>
                    <div className="text-xl text-justify text-black mb-6">{foodDetails.description}</div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-2xl  font-bold text-[#F54748]">
                            Quantity : 4
                        </div>
                        <span className="flex items-center space-x-4">
                            <div
                                className="shadow-sm text-white bg-red-500 hover:bg-red-700  cursor-pointer p-4  rounded-full  relative"

                            >
                                <AiOutlineMinus className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
                            </div>
                            <span className="text-red-500 px-6 py-2 bg-slate-50 text-lg font-medium">
                                1
                            </span>
                            <div
                                className="shadow-sm text-white bg-red-500 hover:bg-red-700  cursor-pointer p-4  rounded-full  relative"

                            >
                                <AiOutlinePlus className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
                            </div>
                        </span>
                        <div className="text-2xl mb-2 font-bold text-[#F54748]">
                       Price:  ₹ {foodDetails.price}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:gap-5 sm:mx-auto sm:justify-center">
                        <button className="text-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full sm:w-[12rem] rounded-full px-8 py-2 text-xl font-medium bg-white">
                            Favorite
                        </button>
                        <button className="bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full sm:w-[12rem] rounded-full px-8 py-2 text-xl font-medium text-white">
                            Add to cart
                        </button>
                    </div>


                </div>
            </div>

            <div className="grid lg:grid-cols-4 pb-14 md:grid-cols-2 grid-cols-2 gap-8">
                <div className="bg-[#F54748] py-4 cursor-default text-center text-white font-medium px-6 text-xl">
                    Catagory : {foodDetails?.catagory}
                </div>
                <div className="bg-[#F54748] py-4 cursor-pointer text-center text-white font-medium px-6 text-xl">
                    Size:5
                </div>
                <div className="bg-[#F54748] py-4 cursor-pointer text-center text-white font-medium px-6 text-xl">
                    Weight : {foodDetails?.weight}
                </div>
                <div className="bg-[#F54748] py-4 text-center cursor-pointer text-white font-medium px-6 text-xl">
                    other :abck
                </div>
            </div>
            
        </div>
    </div>
    )
}
export default FoodPage