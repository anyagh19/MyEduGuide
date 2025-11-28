export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">

      {/* Hero Section */}
      <section className="w-full bg-linear-to-r from-indigo-500 to-purple-600 text-white py-20 px-6 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          We’d love to hear from you! Whether you have questions, feedback, or collaboration ideas — reach out anytime.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-10 mt-10 border border-gray-100">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
          Send a Message
        </h2>

        <form className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <input
              type="text"
              placeholder="Let us know how we can help"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message here..."
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition w-full md:w-auto"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Info Section */}
      <section className="w-full max-w-5xl px-6 py-20 grid md:grid-cols-3 gap-8 text-center">
        {[
          { title: "Email", value: "support@example.com" },
          { title: "Phone", value: "+91 98765 43210" },
          { title: "Location", value: "Pune, Maharashtra" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition"
          >
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">{item.title}</h3>
            <p className="text-gray-700 text-lg">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="w-full bg-purple-600 text-white text-center py-16 mt-10 shadow-inner">
        <h2 className="text-3xl font-semibold mb-4">We are here to help!</h2>
        <p className="text-lg mb-6 opacity-90">Reach out anytime — our support team responds quickly.</p>
        <button className="bg-white text-purple-600 font-semibold px-8 py-3 text-lg rounded-xl hover:bg-gray-100 transition">
          Chat With Support
        </button>
      </section>
    </div>
  );
}
// import { Mail, Phone, MapPin } from "lucide-react";

// export default function ContactPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
//         {/* Left Section */}
//         <div className="space-y-6">
//           <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>
//           <p className="text-gray-600 text-lg leading-relaxed">
//             Have questions, feedback, or need support? We're here to help! Reach out to us
//             anytime and our team will get back to you as soon as possible.
//           </p>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <Phone className="w-6 h-6 text-blue-600" />
//               <p className="text-gray-700 text-lg">+91 98765 43210</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <Mail className="w-6 h-6 text-blue-600" />
//               <p className="text-gray-700 text-lg">support@example.com</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <MapPin className="w-6 h-6 text-blue-600" />
//               <p className="text-gray-700 text-lg">123 Tech Park, Mumbai, India</p>
//             </div>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <div>
//           <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
//             <h3 className="text-2xl font-semibold text-gray-800">Send us a message</h3>
//             <form className="space-y-4">
//               <div>
//                 <label className="block text-gray-600 mb-1 font-medium">Your Name</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 mb-1 font-medium">Email Address</label>
//                 <input
//                   type="email"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-600 mb-1 font-medium">Message</label>
//                 <textarea
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
//                   placeholder="Write your message here..."
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }