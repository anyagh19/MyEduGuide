import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between w-full px-8 py-4 shadow-sm bg-white">
      
      {/* Logo */}
      <div className=" text-violet-600 font-medium text-2xl">
        EduMentor
      </div>

      {/* Nav Links */}
      <nav className="flex items-center gap-8 text-lg font-medium">
        <Link to={'/'}><h2 className="cursor-pointer hover:text-blue-600 transition">Home</h2></Link>
        <Link to={'/about'}><h2 className="cursor-pointer hover:text-blue-600 transition">About</h2></Link>
        <Link to={'/contact'}><h2 className="cursor-pointer hover:text-blue-600 transition">Contact</h2></Link>
      </nav>

      {/* Login Button */}
      <div>
        <Link to={'/signin'}><button className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 transition">
          Log In
        </button></Link>
      </div>

    </header>
  );
}

export default Header;
