export default function About() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header Section */}
      <section className="w-full bg-linear-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          We are passionate creators, committed to building modern, elegant, and user-friendly digital experiences.
        </p>
      </section>

      {/* Mission Section */}
      <section className="w-full max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to deliver high-quality products that enrich the lives of people around the world.
            We focus on simplicity, performance, and exceptional design. Every line of code reflects
            our dedication to excellence and innovation.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/450x300"
            alt="Mission"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full max-w-6xl px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Innovation", desc: "We embrace new ideas and push boundaries." },
            { title: "Quality", desc: "We craft experiences with attention to the smallest details." },
            { title: "Trust", desc: "We value transparency and long-term relationships." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition"
            >
              <h3 className="text-2xl font-semibold mb-3 text-blue-600">{item.title}</h3>
              <p className="text-gray-600 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100"
            >
              <img
                src={`https://via.placeholder.com/150?text=Person+${i}`}
                className="w-32 h-32 rounded-full shadow mb-4"
                alt="Team Member"
              />
              <h3 className="text-xl font-semibold">Member {i}</h3>
              <p className="text-gray-600">Creative Specialist</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-indigo-600 text-white text-center py-16 mt-10 shadow-inner">
        <h2 className="text-3xl font-semibold mb-4">Want to work with us?</h2>
        <p className="text-lg mb-6 opacity-90">Join us in building world-class digital experiences.</p>
        <button className="bg-white text-indigo-600 font-semibold px-8 py-3 text-lg rounded-xl hover:bg-gray-100 transition">
          Contact Our Team
        </button>
      </section>
    </div>
  );
}