// Note: We'll assume the `lucide-react` icons (Mail, Phone, MapPin) are available 
// as they are standard for modern React/Tailwind setups and greatly improve the contact info section.
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"; 

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">

      {/* Hero Section: Strong Gradient and Text */}
      <section className="w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-24 px-6 text-center shadow-2xl relative">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
          Get in Touch
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95 font-light mt-3 animate-fade-in-up">
          Have a question about quizzing, need support, or just want to share feedback? We're here to help!
        </p>
      </section>

      {/* Contact Content & Form Section: Split Layout */}
      <section className="w-full max-w-6xl px-6 py-20 grid md:grid-cols-5 gap-12 -mt-10 z-10">
        
        {/* Contact Information (Left Column - 2/5 width) */}
        <div className="md:col-span-2 space-y-8 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 h-fit animate-slide-in-left">
          
          <h2 className="text-3xl font-extrabold text-gray-800 border-b pb-2">Connect Directly</h2>
          <p className="text-gray-600 text-lg">
            Reach out to our dedicated support team via the channels below. We aim to respond within 24 hours.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4 p-3 bg-indigo-50/50 rounded-lg hover:bg-indigo-100 transition duration-300 cursor-pointer">
              <Mail className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Support Email</h3>
                <p className="text-indigo-600 font-medium">support@edumentor.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-3 bg-indigo-50/50 rounded-lg hover:bg-indigo-100 transition duration-300 cursor-pointer">
              <Phone className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Phone/Whatsapp</h3>
                <p className="text-indigo-600 font-medium">+91 98765 43210</p>
              </div>
            </div>

            {/* Location (if relevant) */}
            <div className="flex items-start gap-4 p-3 bg-indigo-50/50 rounded-lg hover:bg-indigo-100 transition duration-300">
              <MapPin className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Global HQ</h3>
                <p className="text-gray-600">Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Right Column - 3/5 width) */}
        <div className="md:col-span-3 bg-white p-10 rounded-3xl shadow-2xl border-t-4 border-purple-400 animate-slide-in-right">
          <h2 className="text-3xl font-extrabold mb-8 text-gray-900 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-600" /> Send Us A Message
          </h2>

          <form className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-200 transition duration-200"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-200 transition duration-200"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                id="subject"
                type="text"
                placeholder="Topic of your inquiry (e.g., Feature Request, Technical Issue)"
                className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-purple-200 transition duration-200"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={6}
                placeholder="Write your detailed message here..."
                className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 resize-none focus:outline-none focus:ring-4 focus:ring-purple-200 transition duration-200"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Secure Message
            </button>
          </form>
        </div>
      </section>

      {/* Final CTA: Strong closing call to action */}
      <section className="w-full bg-purple-700 text-white text-center py-20 mt-16 shadow-inner">
        <h2 className="text-4xl font-extrabold mb-4">Need a Quiz right now?</h2>
        <p className="text-xl mb-8 opacity-90 font-light">Don't wait! Jump back into your dashboard and turn those notes into knowledge.</p>
        <button className="bg-white text-purple-700 font-extrabold px-10 py-4 text-xl rounded-full shadow-2xl hover:bg-indigo-50 transition duration-300 transform hover:scale-105">
          Go to Dashboard
        </button>
      </section>
    </div>
  );
}