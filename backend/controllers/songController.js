const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generateSongRecommendation = async (req, res) => {
  try {
    const { genre, mood, year, language } = req.body;

    if (!genre || !mood) {
      return res.status(400).json({
        success: false,
        message: "Please provide both genre and mood",
      });
    }

// ========= PROMPTING STRATEGIES =========

// ✅ ZERO-SHOT
/*
const prompt = `Recommend 3 songs in the genre "${genre}" for someone in a "${mood}" mood. 
Respond strictly in JSON like this: { "songs": ["Song1", "Song2", "Song3"] }`;
*/

// ✅ ONE-SHOT
/*
const prompt = `
Input: genre = "Action", mood = "Excited"
Output (JSON): { "songs": ["Song1", "Song2", "Song3"] }

Now, using the same format:
Input: genre = "${genre}", mood = "${mood}"
Output (JSON):
`;
*/

// ✅ MULTI-SHOT
/*
const prompt = `
Example 1:
Input: genre = "Comedy", mood = "Sad"
Output (JSON): { "songs": ["Song1", "Song2", "Song3"] }

Example 2:
Input: genre = "Romance", mood = "Happy"
Output (JSON): { "songs": ["Song1", "Song2", "Song3"] }

Now, using the same format:
Input: genre = "${genre}", mood = "${mood}"
Output (JSON):
`;
*/

// ✅ SYSTEM + USER PROMPTING
/*
const systemPrompt = `
You are a helpful song recommendation assistant.
Always respond only in JSON format with this structure:
{ "songs": ["Song1", "Song2", "Song3"] }
`;

const userPrompt = `
Recommend 3 songs in the genre "${genre}" for someone in a "${mood}" mood.
`;

const prompt = systemPrompt + "\n" + userPrompt;
*/


    // ✅ DYNAMIC PROMPTING
    let extraContext = "";
    if (year) extraContext += ` around the year ${year}`;
    if (language) extraContext += ` in ${language} language`;

    const prompt = `
You are a song recommendation assistant.
Recommend exactly 3 songs.

Respond only in JSON:
{
  "songs": [
    { "title": "Song 1", "year": "Year", "reason": "Why this song" },
    { "title": "Song 2", "year": "Year", "reason": "Why this song" },
    { "title": "Song 3", "year": "Year", "reason": "Why this song" }
  ]
}

**Important:** Only pick songs that were actually released in that year.
`;

  // ==========================================================
    // TEMPERATURE
    // ==========================================================
    
//     const prompt = `Recommend 3 movies in the genre "${genre}" for someone in a "${mood}" mood.
// Respond in JSON: { "movies": ["Movie1", "Movie2", "Movie3"] }`;

//     const result = await model.generateContent({
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//       generationConfig: { temperature: 0.9 }, // higher = more creative
//     });
    


    // ========= CALL GEMINI =========
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
  generationConfig: { temperature: 0.2 },
    });
    let response = result.response.text();

    // Clean up markdown fences if present
    response = response.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(response);
    } catch (parseErr) {
      console.error("JSON Parse Error:", response);
      return res.status(500).json({
        success: false,
        message: "Failed to parse Gemini response",
        rawResponse: response,
      });
    }

    res.status(200).json({
      success: true,
      data: parsed.songs || [],
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const zeroShot = async (req, res) => {
  try {
    const prompt = "What is the meaning of life?";

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3 }, // balanced creativity
    });

    let response = result.response.text();
    response = response.replace(/```/g, "").trim();

    return res.status(200).json({ message: response });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const oneShot = async (req, res) =>{
  try{
        const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `
          Example:  
Text: 'I love this movie!'  
Sentiment: Positive  

Now classify this text:  
Text: "This food tastes terrible."  
Sentiment:

` }] }],
    });
    let response = result.response.text();

    // Clean up markdown fences if present
    response = response.replace(/```json|```/g, "").trim();

    return res.status(200).json({message : response});
  }catch(error){
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const multiShot = async (req, res) =>{
  try{
        const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `
           Example 1:
Q: Write a Python function to add two numbers.
A:
def add(a, b):
    return a + b

Example 2:
Q: Write a Python function to check if a number is even.
A:
def is_even(n):
    return n % 2 == 0

Now your turn:
Q: Write a Python function to find the factorial of a number.
A:

` }] }],
    });
    let response = result.response.text();

    // Clean up markdown fences if present
    response = response.replace(/```json|```/g, "").trim();

    return res.status(200).json({message : response});
  }catch(error){
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const dynamicPrompt = async (req, res) => {
  try {
    const user_name = "Issac";
    const city = "Kerala";

    const prompt = `Write a welcome message for ${user_name} who just signed up from ${city}.`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4 },
    });

    let response = result.response.text();
    response = response.replace(/```/g, "").trim();

    return res.status(200).json({ message: response });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const stopSequence = async (req, res) => {
  try {
    const prompt = `
List 3 fruits in CSV format, separated by commas.
Important: Stop after listing 3 fruits, do not continue writing.
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2 },
    });

    let response = result.response.text();
    response = response.replace(/```/g, "").trim();

    // Ensure we stop at the first 3 fruits (before the 3rd comma)
    const parts = response.split(",");
    const trimmed = parts.slice(0, 3).map(p => p.trim()).join(",");

    return res.status(200).json({ message: trimmed });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { generateSongRecommendation , zeroShot, oneShot, multiShot, dynamicPrompt, stopSequence};