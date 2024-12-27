"use client";
import { useState } from "react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setResponse(response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setResponse("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-4 md:p-8">
      <main className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            AI Content Generator
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Transform your ideas into amazing content...
          </p>
        </div>

        {/* Main Content Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={generateContent} className="space-y-6">
            <div className="relative">
              <textarea
                className="w-full p-4 text-base md:text-lg rounded-xl bg-white/20 backdrop-blur-sm 
                          border border-white/20 text-white placeholder-white/60 focus:outline-none 
                          focus:ring-2 focus:ring-white/50 transition duration-200"
                rows={6}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your creative prompt here..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-6 
                       rounded-xl font-semibold text-lg transition duration-300 transform hover:scale-[1.02] 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Generating Magic...</span>
                </>
              ) : (
                "Generate ✨"
              )}
            </button>
          </form>

          {response && (
            <div className="mt-8 bg-white/20 rounded-xl p-6 backdrop-blur-sm animate-fade-in">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span> Generated Content
              </h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-white/90 whitespace-pre-wrap text-base md:text-lg leading-relaxed">
                  {response}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* <a
            href="https://ai.google.dev/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full 
                     text-white transition duration-300 flex items-center gap-2 hover:scale-105"
          >
            <span>📚</span> Gemini AI Docs
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full 
                     text-white transition duration-300 flex items-center gap-2 hover:scale-105"
          >
            <span>⚡</span> Next.js Docs
          </a> */}
          <p style={{ fontSize: "15px", color: "green" }}>&copy; 2024 AI Generator by JP. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
