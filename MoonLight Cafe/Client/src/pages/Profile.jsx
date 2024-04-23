import axios from 'axios';
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from '../context/userContext';

const Profile = () => {
    const [image, setImage] = useState({});
    const { user, setUser } = useUserContext()
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
            toast.success("Image Uploaded")
        } catch (error) {
            console.log(error);
        }
    };


    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;

        const country = form.country.value;
        const city = form.city.value;
        const state = form.state.value;
        const zipCode = form.zipCode.value;
        const profileImage = image?.url

        try {
            const res = await axios.put(
                "http://localhost:8000/api/v1/user/update",
                {
                    userId: user.user._id,
                    name,
                    country,
                    city,
                    state,
                    zipCode,
                    profileImage
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data.success) {

                toast.success(res.data.message);
                form.reset();
                location.reload();
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {

            console.log(error);
        }


    };


    return (
        <div className='profile'>
            <div className="w-full mx-auto">
                <form
                    className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5"
                    onSubmit={handleOnSubmit}

                >
                    <label htmlFor="file-upload" className='custom-file-upload'>
                        <img src={image?.url || user?.user?.profileImage} className="h-32 cursor-pointer mx-auto w-32 bg-contain rounded-full" alt="" />
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
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 ">

                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="name"
                            id="name"
                            type="text"
                            placeholder={user?.user?.name}

                        />




                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="email"

                            type="email"
                            disabled
                            placeholder={user?.user?.email}
                        />

                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="country"

                            type="text"
                            placeholder={user?.user?.country || "Country"}
                        />
                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="city"

                            type="text"
                            placeholder={user?.user?.city || "City"}
                        />
                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="state"

                            type="text"
                            placeholder={user?.user?.state || "State"}
                        />
                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="zipCode"

                            type="text"
                            placeholder={user?.user?.zipCode || "ZipCode"}
                        />


                    </div>


                    <button
                        className="bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center"
                        type="submit"
                    >
                        Update Profile
                    </button>

                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Profile
