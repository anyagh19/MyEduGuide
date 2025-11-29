// src/modules/user/Progress.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

interface ProgressItem {
  id: number;
  studied: string;
  date: string;
  score: number | null;
  total: number | null;
  percentage: number | null;
}

const Progress = () => {
  const navigate = useNavigate();
  const [progressList, setProgressList] = useState<ProgressItem[]>([]);
  const [studied, setStudied] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const res = await api.get<ProgressItem[]>("/api/progress/");
      setProgressList(res.data.reverse());
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studied.trim()) return;

    try {
      await api.post("/api/progress/", { studied, score: 0, total: 0 });
      setStudied("");
      fetchProgress();
    } catch (err) {
      console.error("Error creating progress:", err);
    }
  };

return (
  // 1. FIXED HEIGHT: The main container now enforces a height (e.g., 90vh)
  // and is set to `flex-col` so its children can use `flex-1`.
  <div className="w-full mx-auto p-8 bg-gray-50  rounded-xl flex flex-col h-[90vh]">
    
    {/* Header & Branding - Fixed height area (flex-shrink-0) */}
    <header className="mb-8 border-b pb-4 border-indigo-200 flex-shrink-0">
      <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
        <span role="img" aria-label="Book and Pencil">📚</span> MyEduGuide <span className="text-xl text-gray-500">| Study Tracker</span>
      </h1>
      <p className="text-md text-gray-600 mt-2">
        Quick notes of what you studied. Click{" "}
        <span className="font-bold text-indigo-600">Take Quiz</span> to test your knowledge!
      </p>
    </header>
    
    {/* --- */}

    {/* Input row - Fixed height area (flex-shrink-0) */}
    <form onSubmit={handleSubmit} className="mb-10 flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-lg border border-indigo-100 flex-shrink-0">
      <input
        value={studied}
        onChange={(e) => setStudied(e.target.value)}
        placeholder="What did you study today? e.g., 'Phases of Mitosis' or 'React Hooks'"
        className="flex-1 w-full border border-gray-300 rounded-lg px-5 py-3 text-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02]"
      >
        ➕ Add Topic
      </button>
    </form>
    
    {/* --- */}

    {/* 2. SCROLLABLE AREA: This section uses 'flex-1' to take up all remaining vertical space 
        and 'overflow-y-auto' to create the internal scrollbar for the progress list. */}
    <div className="flex-1 overflow-y-auto space-y-5 pr-3">
      <h2 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 sticky top-0 bg-gray-50 z-10 pt-1">Your Study Progress</h2>
      
      {loading ? (
        <div className="text-center text-indigo-500 py-12 text-xl font-medium">
          <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-indigo-500 mx-auto mb-4"></div>
          Loading Progress List…
        </div>
      ) : progressList.length === 0 ? (
        <div className="text-gray-500 py-12 text-center text-lg bg-white rounded-xl shadow-inner border border-dashed border-gray-300">
          ✨ No progress tracked yet. Add your first topic above!
        </div>
      ) : (
        progressList.map((item) => (
          // Individual List Item 
          <article
            key={item.id}
            className="p-5 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white hover:bg-indigo-50/50"
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1 min-w-0">
                
                {/* Topic and Date */}
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-extrabold text-xl text-gray-900 truncate tracking-tight">
                    📌 {item.studied}
                  </h3>
                  <span className="text-sm text-gray-500 font-light bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>

                {/* Progress Bar and Score Details */}
                <div className="mt-3 flex items-center gap-5 text-sm text-gray-700">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="text-indigo-600">Progress:</span>
                    <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.percentage ?? 0}%` }}
                        className={`h-full transition-all duration-500 ${
                            (item.percentage ?? 0) >= 70 ? 'bg-green-500' : 
                            (item.percentage ?? 0) >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <span className="font-extrabold text-gray-900">{(item.percentage ?? 0).toFixed(0)}%</span>
                  </div>

                  <div className="text-md font-medium">
                    Quiz Score:{" "}
                    <span className="text-lg font-extrabold text-indigo-800">
                      {item.score ?? 0}/{item.total ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() =>
                    navigate("/user/quiz", { state: { id: item.id, studied: item.studied } })
                  }
                  className="px-5 py-2.5 text-md font-bold bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
                >
                  Take Quiz 🚀
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  </div>
);
};

export default Progress;
