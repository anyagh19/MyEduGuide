import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-5 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Welcome to <span className="text-blue-600">Your Website</span>
          </h1>
          <p className="text-gray-600 text-lg">
            A modern platform built with React + TypeScript + TailwindCSS. Fast, clean, and fully customizable.
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              to="/about"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="border border-gray-300 px-6 py-3 rounded-xl text-lg hover:bg-gray-100 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://via.placeholder.com/450x300"
            alt="Hero"
            className="rounded-2xl shadow-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition border border-gray-100"
          >
            <h2 className="text-2xl font-semibold mb-3">Feature {item}</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            </p>
          </div>
        ))}
      </section>

      {/* Footer CTA Section */}
      <section className="w-full bg-blue-600 text-white text-center py-16 mt-10">
        <h2 className="text-3xl font-semibold mb-4">Ready to explore more?</h2>
        <p className="text-lg mb-6">Join us and start building amazing experiences today.</p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-8 py-3 text-lg rounded-xl hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </section>
    </div>
  );
}
