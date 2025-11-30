export default function About() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      
      {/* Header Section: Strong Gradient and Shadow */}
      <section className="w-full bg-linear-to-r from-indigo-600 to-purple-700 text-white py-24 px-6 text-center shadow-2xl relative overflow-hidden">
        {/* Subtle background animation element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-white/20 animate-pulse"></div> 
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 relative z-10 animate-fade-in-down">
          About EduMentor
        </h1>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95 relative z-10 font-light mt-3 animate-fade-in-up">
          We are dedicated to building a **smarter, faster, and more effective** way to study and track academic progress.
        </p>
      </section>

      {/* Mission Section: Enhanced Layout with Focus on Education */}
      <section className="w-full max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="animate-slide-in-left">
          <span className="text-indigo-600 text-xl font-bold mb-2 block">Our Vision 🧠</span>
          <h2 className="text-4xl font-extrabold mb-5 text-gray-900 leading-tight">
            Empowering Students Through Adaptive Learning
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-purple-500 pl-4 bg-white p-4 rounded-lg shadow-inner">
            Our mission is to bridge the gap between simple note-taking and true mastery. By leveraging technology to **instantly transform study material into challenging quizzes**, we provide students with immediate feedback and a clear, visual representation of their learning journey. We focus on **simplicity, performance, and actionable insights**.
          </p>
        </div>
        
        {/* Image Placeholder */}
        <div className="flex justify-center animate-slide-in-right">
          
          <img
            src="https://i.pinimg.com/736x/30/4f/0f/304f0ff617a3e586ef740d84f414a454.jpg"
            alt="MyEduGuide Mission: Adaptive learning and progress tracking"
            className="rounded-3xl shadow-2xl border-4 border-white transition duration-500 transform hover:scale-[1.05]"
          />
        </div>
      </section>

      <hr className="w-4/5 max-w-5xl border-t border-indigo-100" />
      
      {/* Values Section: Animated Cards */}
      <section className="w-full max-w-6xl px-6 py-16 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-gray-900">Our Core Principles</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: '💡', title: "Innovation", desc: "Using smart tools (like AI) to create personalized, engaging study experiences." },
            { icon: '🎯', title: "Mastery Focus", desc: "Prioritizing deep understanding over rote memorization with continuous testing." },
            { icon: '🤝', title: "User Trust", desc: "Building a transparent platform that genuinely supports the student's success." },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl border-b-4 border-indigo-400 transition duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-indigo-700">{item.title}</h3>
              <p className="text-gray-600 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="w-4/5 max-w-5xl border-t border-indigo-100" />
      
   
      {/* Final CTA: Strong closing call to action */}
      <section className="w-full bg-purple-700 text-white text-center py-20 mt-16 shadow-inner">
        <h2 className="text-4xl font-extrabold mb-4">Ready to start learning smarter?</h2>
        <p className="text-xl mb-8 opacity-90 font-light">Join thousands of students who are turning notes into knowledge.</p>
        <button className="bg-white text-purple-700 font-extrabold px-10 py-4 text-xl rounded-full shadow-2xl hover:bg-gray-100 transition duration-300 transform hover:scale-105">
          Join EduMentor Today!
        </button>
      </section>
    </div>
  );
}