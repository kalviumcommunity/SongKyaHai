// src/components/MovieGenerator.jsx
import { useState } from "react";
import axios from "axios";

function SongGenerator() {
  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

const genres = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Jazz",
  "Classical",
  "Country",
  "Electronic",
  "Reggae",
  "Metal",
  "Blues",
  "Folk",
];


  const moods = [
    "Excited",
    "Happy",
    "Sad",
    "Adventurous",
    "Romantic",
    "Scared",
    "Relaxed",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSongs([]);

    try {
      const res = await axios.post("http://localhost:5000/api/songs/recommend", {
        genre,
        mood,
      });

      if (res.data.success) {
        setSongs(res.data.data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Genre Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Select Genre:</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">-- Choose a Genre --</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Mood Dropdown */}
        <div>
          <label className="block mb-1 font-semibold">Select Mood:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">-- Choose a Mood --</option>
            {moods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Generating..." : "Get Recommendations"}
        </button>
      </form>

      {/* Results */}
      <div className="mt-6">
        {songs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3">🎥 Recommended Songs:</h2>
            <ul className="space-y-3">
              {songs.map((song, index) => (
                <li
                  key={index}
                  className="border p-3 rounded-lg shadow-sm bg-gray-50"
                >
                  <p className="font-semibold">{song.title}</p>
                  {song.year && <p className="text-sm">Year: {song.year}</p>}
                  {song.reason && (
                    <p className="text-sm text-gray-600">
                      Why: {song.reason}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SongGenerator;