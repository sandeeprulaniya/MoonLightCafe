import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../../assets/Logo.png";

const AddFood = () => {

    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);

    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        console.log([...formData]);
        setUploading(true);
        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/all/upload-image", formData);
            // console.log("Image Upload", data);
            setUploading(false);
            setImage({
                url: data.url,
                public_id: data.public_id,
            });
            if (uploading == false) {
                toast.success(" Item Successfully added");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit =async(event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const catagory = form.catagory.value;
        const weight = form.weight.value;
        const location= form.location.value;
        const description= form.description.value;
        const foodImage = image?.url
        const foodData = { name, price, weight, location,catagory, description,foodImage };

        const res = await axios.post("http://localhost:8000/api/v1/food/addfood",{name, price, weight, location,catagory, description,foodImage},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })

        if(res.data.success){
            toast.success(res.data.message)
        } else{
            toast.error(res.data.message)
        }
    }
    return (
        <div className='addfood'>
            <div className="w-full mx-auto">
                <form
                    className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5" onSubmit={handleSubmit}

                >
                    {/* <label htmlFor="file-upload" className='custom-file-upload'>
                        <img src={image?.url || avatar} className="h-32 cursor-pointer mx-auto w-32 bg-contain rounded-full" alt="" />
                    </label>
                    <label className="block text-center text-gray-900 text-base  mb-2" htmlFor="name">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        lable="Image"
                        name="myFile"
                        id='file-upload'
                        className=" hidden"
                        accept='.jpeg, .png, .jpg'
                        onChange={handleImage}
                    /> */}

                    <NavLink to="/">
                        <img src={logo} alt="" className="logo text-center h-28 mx-auto cursor-pointer mb-6" />
                    </NavLink>

                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 ">

                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Enter Food Name"
                        />



                        <input type="file" className="bg-red-500 text-white file-input file-input-bordered w-full" name='myFile' onChange={handleImage} accept='.jpeg, .png, .jpg' />

                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="price"
                            id="price"
                            type="number"
                            placeholder="Enter Price"
                        />

                        <select className="select select-md bg-red-500 text-white w-full max-w-xs" name='catagory'>
                            <option disabled selected>Category</option>
                            <option>Rice</option>
                            <option>Chicken</option>
                            <option>Desert</option>
                            <option>Drinks</option>
                            <option>Fruits</option>
                            <option>Pizza</option>
                            <option>other</option>
                        </select>
                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="weight"
                            id="weight"
                            type="number"
                            placeholder="Enter weight"
                        />
                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="location"
                            id="location"
                            type="text"
                            placeholder="Enter Location"
                        />

                        <textarea name='description' className="textarea col-span-2 textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline" placeholder="Description"></textarea>
                    </div>

                    <button
                        className="bg-[#F54748] m-10 active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center"
                        type="submit"
                    >
                        Add Food
                    </button>

                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AddFood
