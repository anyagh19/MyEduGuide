import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center overflow-x-hidden">
      
      {/* Hero Section: Focused on Learning & Quizzing */}
      <section className="w-full max-w-7xl px-8 py-24 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12 bg-white shadow-xl rounded-b-[40px] border-b-4 border-indigo-200">
        
        {/* Text Content: Animated to fade in/up */}
        <div className="flex flex-col gap-6 max-w-xl animate-fade-in-up"> 
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Your personalized <span className="text-indigo-600 drop-shadow-md">AI Mentor</span>
          </h1>
          <p className="text-gray-700 text-xl font-light">
            **EduMentor** helps you turn study notes into powerful quizzes instantly. Track your progress, identify knowledge gaps, and achieve mastery.
          </p>
          
          {/* Action Buttons: Leading to the main progress tracker */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="/user/progress" // Assuming this is the main dashboard route
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Start Tracking Progress 🚀
            </Link>
            <Link
              to="/about"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-[1.02]"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Hero Image: Visual representation of studying/data */}
        <div className="md:w-5/12 flex justify-center p-4">
          {/* Using a more relevant placeholder image description */}
          
          <img
            src="https://i.pinimg.com/736x/0f/f8/78/0ff8788f3adab9660c146eeb10332d20.jpg" // Replace with a custom image later
            alt="Dashboard showing study progress and quiz results"
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white transition duration-500 transform hover:scale-[1.03] animate-float"
            style={{ 
              animation: 'float 6s ease-in-out infinite' 
            }}
          />
        </div>
      </section>

      {/* Features Section: Aligned with MyEduGuide features */}
      <section className="w-full max-w-6xl px-8 py-20 grid md:grid-cols-3 gap-10">
        {[
          { icon: '📝', title: 'Instant Quiz Generation', desc: 'Convert any study topic or quick note into a challenging quiz in seconds, powered by AI.' },
          { icon: '📈', title: 'Detailed Progress Tracking', desc: 'Visualize your scores and topic mastery over time to see exactly where you need improvement.' },
          { icon: '🎯', title: 'Identify Knowledge Gaps', desc: 'Our system highlights your weakest areas, ensuring you focus your revision effectively.' },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-3xl shadow-xl border-t-4 border-indigo-400/50 hover:shadow-2xl transition duration-300 transform hover:translate-y-[-5px] cursor-pointer"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h2>
            <p className="text-gray-600">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>
      
      {/* --- */}

      {/* Footer CTA Section: Encouraging sign-up to start studying */}
      <section className="w-full bg-indigo-700 text-white text-center py-20 mt-16 shadow-inner">
        <h2 className="text-4xl font-extrabold mb-4">Ready to test your knowledge?</h2>
        <p className="text-xl font-light mb-8">Sign up now and transform the way you study, track, and master your subjects.</p>
        <Link
          to="/signup"
          className="bg-white text-indigo-700 px-10 py-4 text-xl font-bold rounded-full shadow-2xl hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
        >
          Get Started for Free!
        </Link>
      </section>
    </div>
  );
}