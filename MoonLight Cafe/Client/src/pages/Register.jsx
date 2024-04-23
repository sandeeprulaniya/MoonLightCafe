// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../assets/Logo.png";
import avatar from "../assets/profile.png"

// import { useUserContext } from "../context/userContext";
const Register = () => {
    const navigate = useNavigate();
    const [postImage, setPostImage] = useState({ profileImage: "" })
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
        } catch (error) {
            console.log(error);
        }
    };
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);

        setPostImage({ ...postImage, profileImage: base64 })
    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordConfrim = form.confrimPassword.value;
        const profileImage = image?.url
        const userData = { name, email, profileImage, password, passwordConfrim };

        fetch("http://localhost:8000/api/v1/user/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem("token", data.data.token);
                    toast.success(data.message);

                    form.reset();
                    // getUser(data);
                    navigate("/");
                } else {
                    toast.error(data.message);
                }
            });
    };
    return (
        <div className="register">
            <div className="w-full mx-auto">
                <form
                    className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5"
                    onSubmit={handleOnSubmit}
                >
                    <label htmlFor="file-upload" className='custom-file-upload'>
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
                    />
                    <div className="mb-3">
                        <label className="block text-gray-900 text-sm  mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="name"
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            className="block text-gray-900 text-sm  mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="email"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="mb-3">
                            <label
                                className="block text-gray-900 text-sm  mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="******************"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                className="block text-gray-900 text-sm  mb-2"
                                htmlFor="confrimPassword"
                            >
                                Confrim Password
                            </label>
                            <input
                                className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 text-gray-900 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="confrimPassword"
                                name="confrimPassword"
                                type="password"
                                placeholder="******************"
                            />
                        </div>
                    </div>

                    <button
                        className="bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center"
                        type="submit"
                    >
                        Register
                    </button>
                    <Link
                        to="/login"
                        className="text-[#FDC55E] text-center font-semibold w-full  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Already account?
                    </Link>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Register;

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}