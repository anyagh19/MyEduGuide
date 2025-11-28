// import { useState } from 'react'

import {  Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import SignInForm from "./modules/auth/SignInForm"
import SignUpForm from "./modules/auth/SignUpForm"
import NotFound from "./pages/NotFound"
import User from "./pages/User"
import ProtectedRoutes from "./components/ProtectedRoutes"


function App() {
 
  // function logout (){
  //   localStorage.clear()
  //   return <Navigate to={'/'} />
  // }


  return (
    <>
    {/* <BrowserRouter> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/user" 
      element={
      <ProtectedRoutes>
        <User />
      </ProtectedRoutes>} />

    </Routes>
    {/* </BrowserRouter> */}
    </>
  )
}

export default App
