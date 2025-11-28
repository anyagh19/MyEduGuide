import {  User, Brain, BarChart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white shadow-xl border-r p-6 flex flex-col">
      
      {/* App Name */}
      <h1 className="text-3xl font-bold text-blue-600 mb-10">
        MyEduGuide
      </h1>

      {/* Menu Items */}
      <nav className="flex flex-col gap-6 text-gray-700">
        
        <Link to={'/user/profile'}>
        <div className="flex items-center gap-3 hover:text-blue-600 cursor-pointer text-lg">
          <User size={22} />
          <span>Profile</span>
        </div>
        </Link>

        <div className="flex items-center gap-3 hover:text-blue-600 cursor-pointer text-lg">
          <Brain size={22} />
          <span>AI Guide</span>
        </div>

        <div className="flex items-center gap-3 hover:text-blue-600 cursor-pointer text-lg">
          <BarChart size={22} />
          <span>Progress</span>
        </div>

        <div className="flex items-center gap-3 hover:text-blue-600 cursor-pointer text-lg">
          <BookOpen size={22} />
          <span>Quizzes</span>
        </div>

      </nav>
    </div>
  );
}
