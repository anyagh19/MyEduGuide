import { Link } from "react-router-dom";
// Assuming social icons are available, e.g., using lucide-react (or similar)
import { Twitter, Instagram, Linkedin, Mail } from "lucide-react"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Updated background color and internal spacing
    <footer className="w-full bg-gray-800 text-white py-12 px-8 border-t-4 border-indigo-600">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-gray-700 pb-10">
        
        {/* 1. Logo + Description (Full width on mobile for emphasis) */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-3xl font-extrabold mb-3 text-indigo-400">
            EduMentor 📚
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Empowering students to master their subjects through instant quizzing and powerful progress tracking. Learn smarter, not just harder.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3">Platform</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <Link to="/" className="hover:text-indigo-400 transition duration-200 block text-base">Home</Link>
            </li>
            <li>
              <Link to="/user/progress" className="hover:text-indigo-400 transition duration-200 block text-base">Dashboard</Link>
            </li>
            <li>
              <Link to="/user/quiz" className="hover:text-indigo-400 transition duration-200 block text-base">Take a Quiz</Link>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 transition duration-200 block text-base">Features</a>
            </li>
          </ul>
        </div>

        {/* 3. Company & Legal */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3">Company</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <Link to="/about" className="hover:text-indigo-400 transition duration-200 block text-base">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-400 transition duration-200 block text-base">Contact Support</Link>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 transition duration-200 block text-base">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 transition duration-200 block text-base">Terms of Service</a>
            </li>
          </ul>
        </div>

        {/* 4. Social & Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3">Connect</h3>
          <ul className="space-y-3 text-gray-300 mb-6">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-400"/>
              <span className="text-base">support@edumentor.com</span>
            </li>
          </ul>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" aria-label="Follow us on Twitter" className="text-gray-400 hover:text-indigo-400 transition duration-200 transform hover:scale-110">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Follow us on Instagram" className="text-gray-400 hover:text-indigo-400 transition duration-200 transform hover:scale-110">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Follow us on LinkedIn" className="text-gray-400 hover:text-indigo-400 transition duration-200 transform hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright */}
      <div className="text-center text-gray-400 mt-8 pt-4">
        &copy; {currentYear} EduMentor | All Rights Reserved. Crafted with passion in Pune, India.
      </div>
    </footer>
  );
}