# 🎶 SongKyaHai – Mood-based Song Generator

SceneKyaHai is an AI-powered music recommendation system that suggests songs based on your current mood.
Built as part of the Developing AI Agents using GenAI course, it demonstrates how GenAI concepts can be applied in real-world apps.

## 🚀 Features

Enter your mood in natural language (e.g., “I’m feeling nostalgic but energetic”).

AI analyzes emotions and generates structured JSON output.

Recommender Agent fetches songs matching your mood (via Spotify / Last.fm API).

Album art, artist info, and preview links shown in a clean UI.

Multi-agent architecture: Mood Analyzer Agent + Recommender Agent.

## 🧑‍💻 Tech Stack

Frontend: React + Vite

Backend: Node.js + Express

Database: MongoDB (for caching/search history)

AI: OpenAI / DeepSeek LLMs

Music Data: Spotify API / Last.fm API

## 📚 GenAI Concepts Used (7 Marks)

Each concept below is worth 1 mark:

Zero-shot Prompting

The Mood Analyzer can understand user emotions without examples.

Example: “Extract primary and secondary emotions from this text and return JSON.”

Dynamic Prompting

Prompts adapt based on user preferences (e.g., exclude sad songs if requested).

System & User Prompts

System prompt sets the agent role (“You are MoodAnalyzer…”), while the user provides mood input.

Structured Output

Responses are enforced in JSON for easy parsing by the frontend.

Temperature

Controls creativity of recommendations (low = safe picks, high = diverse picks).

Top P (Nucleus Sampling)

Ensures balance between trending hits and niche tracks.

Function Calling

AI triggers backend functions like getSongDetails() to fetch Spotify data.