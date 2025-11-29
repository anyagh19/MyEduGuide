import { useEffect, useState } from "react";
import api from "../../../api";

export default function Report() {
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await api.get("api/generate-report/");
      if (res.status === 200) {
        setReport(res.data.report);
      } else {
        setError(res.data.error || "Failed to load report");
      }
    } catch {
      setError("Server not responding...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(report);
  };

  // Split report into sections based on headings
  const splitIntoSections = () => {
    const lines = report.split("\n");
    const sections: { title: string; content: string[] }[] = [];

    let currentTitle = "";
    let currentContent: string[] = [];

    lines.forEach((line) => {
      if (line.startsWith("##")) {
        // Save previous section
        if (currentTitle) {
          sections.push({ title: currentTitle, content: currentContent });
        }
        currentTitle = line.replace("##", "").trim();
        currentContent = [];
      } else {
        if (line.trim() !== "") currentContent.push(line);
      }
    });

    if (currentTitle) {
      sections.push({ title: currentTitle, content: currentContent });
    }

    return sections;
  };

  const sections = splitIntoSections();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-10">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-2">
          📘 Study Progress Report
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Your personalized learning performance summary
        </p>

        {/* Loading */}
        {loading && (
          <p className="text-center text-lg font-medium text-gray-600 animate-pulse">
            Generating your report... ⏳
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}

        {/* Report Sections */}
        {!loading && !error && (
          <div className="space-y-8">
            
            {/* User Info Card */}
            <div
              className="p-6 bg-blue-50 rounded-2xl shadow-md border border-blue-200
                         hover:shadow-xl transition-all duration-500"
            >
              <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                👤 User Profile
              </h2>
              <div className="text-gray-700 space-y-1">
                {report.split("\n").slice(0, 15).map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Dynamic Sections */}
            {sections.map((sec, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200
                           hover:shadow-2xl transition-all duration-500"
              >
                <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
                  📌 {sec.title}
                </h2>

                <div className="text-gray-700 space-y-2">
                  {sec.content.map((c, i) => (
                    <p key={i}>{c}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Motivational Box */}
            <div className="p-6 bg-green-50 border border-green-200 rounded-2xl shadow-md 
                            hover:shadow-xl transition-all duration-500">
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                💡 Motivation
              </h2>
              <p className="text-gray-700">
                {
                  sections.find((x) =>
                    x.title.toLowerCase().includes("motivational")
                  )?.content[0]
                }
              </p>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 
                         text-white font-semibold p-4 rounded-xl shadow-xl
                         transition transform hover:scale-105"
            >
              Copy Full Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
