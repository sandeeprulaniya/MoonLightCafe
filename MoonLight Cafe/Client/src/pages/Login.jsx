// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/Logo.png";
// import "./login.css";
// import { useUserContext } from "../context/userContext";
const Login = () => {
    const navigate = useNavigate();
    // const { getUser } = useUserContext();
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const loginData = { email, password };

        fetch("http://localhost:8000/api/v1/user/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem("token", data.data.token);
                    toast.success(data.message);
                    // getUser(data);
                    e.target.reset();
                    navigate("/");
                } else {
                    toast.error(data.message);
                }
            });
    };
    return (
        <div className="login">
            <div className=" h-screen ">
                <form
                    className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5"
                    onSubmit={handleOnSubmit}
                >
                    <NavLink to="/">
                        <img src={logo} alt="" cl
                        assName="logo text-center h-28 mx-auto cursor-pointer mb-6" />
                    </NavLink>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm  mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm  mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow-sm appearance-none border bg-white rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>

                    <button className="bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center">

                        Sign In
                    </button>

                    <Link
                        to="/register"
                        className=" text-[#FDC55E] text-center font-semibold w-full  mb-3  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        create an account
                    </Link>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
