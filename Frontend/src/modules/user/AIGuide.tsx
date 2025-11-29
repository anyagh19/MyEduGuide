import { useState } from "react";
import api from "../../../api";
import { ACCESS_TOKEN } from "../../../constant";

export default function AIGuide() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! I'm your AI Course Advisor. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      
      if (!token) {
        throw new Error("Not authenticated. Please log in.");
      }

      const res = await api.post(
        "/api/suggest-courses/",
        { message: userInput },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Response:", res.data);

      const reply = res.data.courses;

      if (typeof reply === "object" && reply !== null && !reply.raw_text) {
        setCourses(reply);
        const botMsg = {
          role: "bot",
          text: "✅ I've analyzed your profile and prepared course recommendations!"
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const formattedReply = reply.raw_text || JSON.stringify(reply, null, 2);
        const botMsg = { role: "bot", text: formattedReply };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err: any) {
      console.error("Full error:", err);

      let errorMsg = "Unknown error";

      if (err.response?.status === 401 || err.response?.status === 403) {
        errorMsg = "Authentication failed. Please log in again.";
        localStorage.removeItem(ACCESS_TOKEN);
      } else if (err.response?.status === 404) {
        errorMsg = err.response.data?.error || "Profile not found. Please complete your profile first.";
      } else if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err.message) {
        errorMsg = err.message;
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `⚠️ Error: ${errorMsg}` }
      ]);
    }

    setLoading(false);
  };

  const renderCourseSection = (title: string, courseList: any[]) => {
    if (!courseList || courseList.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-bold text-blue-700 mb-3">{title}</h3>
        <div className="space-y-3">
          {courseList.map((course, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{course.title}</h4>
                  {course.provider && (
                    <p className="text-sm text-gray-500 mt-1">{course.provider}</p>
                  )}
                  {course.description && (
                    <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                  )}
                  {course.link && (
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                    >
                      Open Course →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        <div className="bg-blue-700 text-white p-4">
          <h1 className="text-2xl font-bold text-center">🎓 MyEduGuide AI</h1>
          <p className="text-center text-blue-100 text-sm mt-1">
            Personalized course recommendations based on your profile
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Chat Section */}
          <div className="md:w-1/2 p-5 flex flex-col border-r border-gray-200">
            <div className="flex-1 overflow-y-auto border rounded-xl p-4 bg-gray-50 h-[500px] mb-4 space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl max-w-[85%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                </div>
              ))}

              {loading && (
                <div className="bg-gray-300 text-gray-700 p-3 rounded-xl w-fit">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-gray-700 border-t-transparent rounded-full"></div>
                    <span>Analyzing your profile...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
                placeholder="E.g., 'Suggest ML courses' or 'Career path for data science'"
                className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
                disabled={loading}
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-6 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>

          {/* Recommendations Panel */}
          <div className="md:w-1/2 p-5 bg-gray-50 overflow-y-auto h-[600px]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📚 Course Recommendations
            </h2>

            {courses ? (
              <div>
                {renderCourseSection("🌱 Beginner Courses", courses.beginner)}
                {renderCourseSection("📈 Intermediate Courses", courses.intermediate)}
                {renderCourseSection("🚀 Advanced Courses", courses.advanced)}

                {courses.career_roadmap && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">
                      🗺️ Career Roadmap
                    </h3>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {courses.career_roadmap}
                    </p>
                  </div>
                )}

                {courses.recommended_skills && courses.recommended_skills.length > 0 && (
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-700 mb-2">
                      💡 Recommended Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {courses.recommended_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-lg">Ask me for course suggestions!</p>
                <p className="text-sm mt-2">
                  I'll analyze your profile and recommend the best courses for you.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}