import React from 'react'
import logo from '../assets/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext'
import { useCartContext } from '../context/cart_context'
const Navbar = () => {
    // const [nav,setNav] = useState(false);
    const { user, setUser } = useUserContext()
    const navigate = useNavigate()

    // const handleNav = ()=>{
    //     setNav(!nav);
    // }

    const { cartItems } = useCartContext()
    return (
        <>
            {
                user?.user.isVerified === false && (<div className="bg-red-500 py-3 px-4 text-white" >
                    <Link to="/verifyotp">please verify</Link>
                </div>)
            }



            <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>

                <div className="container  mx-auto flex items-center justify-between">
                    <Link to="/">


                        <img src={logo} alt="" className=" h-14 logo cursor-pointer" />
                    </Link>
                    <div className="right_navbar flex gap-8 items-center">
                        <a href="" className=" text-[#191919] text-xl font-medium">Today special offers</a>

                        <Link to="/my-order">


                            <a href="" className=" text-[#191919] text-xl font-medium">My Order</a></Link>

                        <Link to="/menu" className=" text-[#191919] text-xl font-medium">Our Menu</Link>

                        {
                            user?.user?.role === 'admin' && <Link to="/addfood" className="text-[#191919]
                            text-x1 font-medium hover: text-red-500">Add food</Link>
                        }




                        <a href="" className=" text-[#191919] text-xl font-medium">Popular food</a>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm text-red-500 indicator-item">{cartItems?.length || 0}</span>
                                </div>
                            </div>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow bg-red-100">
                                <div className="card-body">
                                    <span className="font-bold text-lg">{cartItems?.length || 0} items </span>
                                    <div className="card-actions">
                                        <Link to="/viewcart">
                                            <button
                                                className="bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center"
                                                type="submit"
                                            >
                                                view cart
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            user ? (<div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user?.user?.profileImage} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                                    <li>
                                        <Link to="/profile" className="justify-between">
                                            Profile

                                        </Link>
                                    </li>
                                    {
                                        user?.user?.role === 'admin' && <li>
                                            <Link to='/all-order' className="text-[#191919] font-medium hover: text-red-500">All Order</Link>
                                        </li>
                                    }

                                    <li><Link to={`/myrestourant/${user?.user._id}`}>Settings</Link></li>
                                    {
                                        user?.user?.role === 'admin' && <li><Link to={`/allrestourant/${user?.user._id}`}>All restourant</Link></li>
                                    }

                                    <li ><button
                                        onClick={() => {
                                            // message.success("Logout Successfully");
                                            localStorage.clear();
                                            location.reload();
                                            navigate("/");
                                        }}>Logout</button></li>
                                </ul>
                            </div>) : (<Link to="/login">
                                <button className="bg-[#F54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">login</button>
                            </Link>)
                        }

                    </div>
                </div>

            </div></>
    )
}

export default Navbar