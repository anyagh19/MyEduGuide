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
import Profile from "./modules/user/Profile"
import AIGuide from "./modules/user/AIGuide"
import Progress from "./modules/user/Progress"
import Quiz from "./modules/user/Quiz"
import Report from "./modules/user/Report"
import Admin from "./modules/user/Admin"


function App() {
 
  // function logout (){
  //   localStorage.clear()
  //   return <Navigate to={'/'} />
  // }

// localStorage.clear()
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
      element={<ProtectedRoutes>
        <User />
        </ProtectedRoutes>} >
         <Route path="profile" element={<Profile />} />
         <Route path="guide" element={<AIGuide />} />
         <Route path="progress" element={<Progress /> } />
         <Route path="quiz" element={<Quiz /> } />
         <Route path="report" element={<Report/> } />
  
        </Route>
      <Route path="/admin-dashboard" element={<ProtectedRoutes><Admin /></ProtectedRoutes>}/>

    </Routes>
    {/* </BrowserRouter> */}
    </>
  )
}

export default App
