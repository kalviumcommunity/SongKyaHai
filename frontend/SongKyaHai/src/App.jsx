import React from "react";
import SongGenerator from "./componenets/SongGenerator";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          🎬 AI Song Recommender
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter a <span className="font-semibold">genre</span> and your{" "}
          <span className="font-semibold">mood</span> to get personalized
          song recommendations powered by AI.
        </p>
        <SongGenerator />
      </div>
    </div>
  );
}

export default App;