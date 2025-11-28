export default function Footer() {
  return (
    <footer className="w-full bg-gray-700 text-white py-10 px-8 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">YourBrand</h2>
          <p className="text-gray-300 leading-relaxed">
            Building modern web experiences with clean design, smooth UI, and great performance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition">Home</li>
            <li className="hover:text-white cursor-pointer transition">About</li>
            <li className="hover:text-white cursor-pointer transition">Services</li>
            <li className="hover:text-white cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Email: info@yourbrand.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Location: Pune, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} YourBrand — All Rights Reserved.
      </div>
    </footer>
  );
}