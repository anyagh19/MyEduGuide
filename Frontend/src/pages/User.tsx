// import React from 'react'

import { Outlet } from "react-router-dom"
import Sidebar from "../modules/user/Sidebar"

function User() {
  return (
    <div className="w-full min-h-screen flex">
        <div className="w-[20%] h-screen shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            <Sidebar />
        </div>
        <div className=" flex flex-col gap-5 w-[80%]">
            <div className="flex items-center justify-end p-3">
                <button className="py-2 px-4 bg-red-400 rounded-full text-white font-medium hover:bg-red-600 ">Log Out</button>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default User