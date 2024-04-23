import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './shared/Navbar'
import Header from './components/Header'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './shared/Footer'
import ProtectedRoute from './pages/ProtectedRoute'
import VerifyOtp from './pages/VerifyOtp'
import AddFood from './pages/admin/Addfood';
import Menu from './pages/Menu';
import FoodPage from './pages/FoodPage'
import Profile from './pages/Profile'
import ViewCart from './pages/ViewCart'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Order from './pages/Order'
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import MyOrder from './pages/MyOrder'
import AllOrder from './pages/admin/AllOrder'

function App() {
  const [count,setCount] = useState(0)
  const stripePromise = loadStripe('pk_test_51OvgQySIqxJEooqGjZtXk5sE3oRV5GCjeV1Shfx2t6FJbanDlyRlIEc7hPZqh397VmsdXehln4EJ7lDggTBpv6w300OlwZJRbE');

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/verifyotp" element={ <ProtectedRoute><VerifyOtp /></ProtectedRoute>} />
      <Route path="/addfood" element={ <ProtectedRoute><AddFood /></ProtectedRoute>} />
      <Route path="/menu" element={ <ProtectedRoute><Menu /></ProtectedRoute>} />
      <Route path="/menu/:id" element={ <ProtectedRoute><FoodPage /></ProtectedRoute>} />
      <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/viewcart" element={ <ProtectedRoute><ViewCart/></ProtectedRoute>} />
      <Route path="/success" element={ <ProtectedRoute><Success/></ProtectedRoute>} />
      <Route path="/cancel" element={ <ProtectedRoute><Cancel/></ProtectedRoute>} />
      <Route path="/my-order" element={ <ProtectedRoute><MyOrder/></ProtectedRoute>} />
      <Route path="/all-order" element={ <ProtectedRoute><AllOrder/></ProtectedRoute>} />

      <Route path="/order" element={ <ProtectedRoute>

          <Elements stripe={stripePromise}>
          <Order/>
          </Elements>
      
      
      </ProtectedRoute>} />
    </Routes>
    <Footer />
   </>
  )
}

export default App
