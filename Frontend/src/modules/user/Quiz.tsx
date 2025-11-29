// src/modules/user/Quiz.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../api";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface QuizResponse {
  quiz: QuizQuestion[];
}

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const studiedText = location.state?.studied || "";
  const progressId = location.state?.id || null;
  const refreshProgress = location.state?.refreshProgress; // optional callback

  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const response = await api.post<QuizResponse>("/api/generate-quiz/", {
        studied: studiedText,
      });
      setQuiz(response.data.quiz);
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!studiedText) {
      alert("No studied text found!");
      navigate("/user/progress");
    } else {
      fetchQuiz();
    }
  }, []);

  const handleSelect = (qIndex: number, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    let correct = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) correct += 1;
    });

    setScore(correct);
    setSubmitted(true);

    try {
      if (progressId) {
        await api.post(`/api/progress/${progressId}/update-quiz/`, {
          score: correct,
          total: quiz.length,
        });
      } else {
        await api.post("/api/progress/", {
          studied: studiedText,
          score: correct,
          total: quiz.length,
          percentage: (correct / quiz.length) * 100,
        });
      }

      if (refreshProgress) refreshProgress(); // refresh parent page
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 flex flex-col shadow-2xl rounded-lg h-[90vh]">
      <div className="sticky top-0 z-20 bg-white shadow-md rounded-b-xl px-6 pt-6 pb-4 mb-6 border-b-4 border-indigo-500/50 flex-shrink-0">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 tracking-tight">
          🧠 Quiz Based on Your Study
        </h1>
        <p className="text-gray-600 mt-3 text-center text-lg italic">
          <strong>Topic:</strong> {studiedText}
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20 p-10 bg-white rounded-xl shadow-lg flex-1">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-500"></div>
          <p className="text-center text-indigo-500 mt-5 text-xl font-medium">
            Generating an engaging quiz for you...
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-8 pb-8 pr-3">
            {quiz.map((q, index) => (
              <div
                key={index}
                className="bg-white shadow-xl hover:shadow-2xl transition duration-300 rounded-2xl p-6 border-l-4 border-indigo-400"
              >
                <p className="font-bold mb-4 text-xl text-gray-800">
                  <span className="text-indigo-600 mr-2">{index + 1}.</span> {q.question}
                </p>

                <div className="space-y-3">
                  {q.options.map((opt, i) => {
                    const isSelected = answers[index] === opt;
                    const isCorrect = submitted && opt === q.answer;
                    const isIncorrectAndSelected = submitted && isSelected && opt !== q.answer;

                    let optionClass =
                      "flex items-center gap-3 cursor-pointer p-3 rounded-xl transition duration-200 shadow-sm";

                    if (submitted) {
                      if (isCorrect) optionClass += " bg-green-100 border-2 border-green-500";
                      else if (isIncorrectAndSelected) optionClass += " bg-red-100 border-2 border-red-500";
                      else optionClass += " bg-gray-50 hover:bg-gray-100 border border-gray-200";
                    } else {
                      optionClass += ` ${isSelected ? "bg-indigo-100 border-2 border-indigo-500" : "bg-gray-50 hover:bg-indigo-50/50 border border-gray-200"}`;
                    }

                    return (
                      <label key={i} className={optionClass}>
                        <input
                          type="radio"
                          name={`q-${index}`}
                          value={opt}
                          disabled={submitted}
                          checked={isSelected}
                          onChange={() => handleSelect(index, opt)}
                          className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-700 text-base">{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {submitted && (
                  <p
                    className={`mt-4 pt-3 border-t font-semibold text-lg ${
                      answers[index] === q.answer ? "text-green-700 border-green-200" : "text-red-700 border-red-200"
                    }`}
                  >
                    {answers[index] === q.answer ? "✅ Correct!" : "❌ Incorrect."} The Correct Answer was: <span className="font-bold">{q.answer}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="w-full mt-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.01] text-xl flex-shrink-0"
              disabled={Object.keys(answers).length < quiz.length}
            >
              Submit Quiz
            </button>
          ) : (
            <div className="text-center mt-8 p-6 bg-white rounded-xl shadow-xl border-t-4 border-green-500 flex-shrink-0">
              <h2 className="text-3xl font-extrabold text-green-700 animate-pulse">
                🎉 Your Score: {score}/{quiz.length}
              </h2>
              <button
                onClick={() => navigate("/user/progress")}
                className="mt-5 px-8 py-3 bg-gray-700 text-white font-medium rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
              >
                Go to Progress Dashboard 🚀
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
