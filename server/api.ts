import { Router } from "express";
import { db } from "./db.js";
import { GoogleGenAI } from "@google/genai";

const router = Router();

// Initialize Gemini
const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// --- Auth Routes (Mocked for demo) ---
router.post("/auth/login", (req, res) => {
  const { email } = req.body;
  const user = db.prepare("SELECT * FROM Users WHERE email = ?").get(email);
  if (user) {
    res.json({ token: "mock-jwt-token", user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.post("/auth/signup", (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = db.prepare("INSERT INTO Users (name, email, password, login_provider) VALUES (?, ?, ?, ?)").run(name, email, password, "email");
    res.json({ token: "mock-jwt-token", user: { id: result.lastInsertRowid, name, email } });
  } catch (e) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// --- Data Routes ---
router.get("/locations", (req, res) => {
  const locations = db.prepare("SELECT * FROM Locations").all();
  res.json(locations);
});

router.get("/businesses", (req, res) => {
  const { location_id } = req.query;
  let query = "SELECT * FROM Businesses";
  const params = [];
  if (location_id) {
    query += " WHERE location_id = ?";
    params.push(location_id);
  }
  const businesses = db.prepare(query).all(...params);
  res.json(businesses);
});

router.get("/opportunity-analysis", (req, res) => {
  const { location_id } = req.query;
  if (!location_id) return res.status(400).json({ error: "location_id required" });
  
  const scores = db.prepare("SELECT * FROM OpportunityScores WHERE location_id = ? ORDER BY opportunity_score DESC").all(location_id);
  res.json(scores);
});

router.get("/analytics", (req, res) => {
  const { location_id } = req.query;
  if (!location_id) return res.status(400).json({ error: "location_id required" });

  const scores = db.prepare("SELECT * FROM OpportunityScores WHERE location_id = ?").all(location_id);
  const businesses = db.prepare("SELECT category, COUNT(*) as count FROM Businesses WHERE location_id = ? GROUP BY category").all(location_id);
  
  res.json({ scores, businesses });
});

// --- Community & Reviews ---
router.get("/community-posts", (req, res) => {
  const posts = db.prepare(`
    SELECT p.*, u.name as author_name 
    FROM CommunityPosts p 
    JOIN Users u ON p.user_id = u.id 
    ORDER BY p.created_at DESC
  `).all();
  res.json(posts);
});

router.post("/community-post", (req, res) => {
  const { user_id, title, content } = req.body;
  const result = db.prepare("INSERT INTO CommunityPosts (user_id, title, content) VALUES (?, ?, ?)").run(user_id, title, content);
  res.json({ id: result.lastInsertRowid, success: true });
});

// --- AI Routes ---
router.post("/ai/generate-idea", async (req, res) => {
  const { budget, skills, location } = req.body;
  const ai = getAi();
  if (!ai) return res.status(500).json({ error: "AI not configured" });

  try {
    const prompt = `As a business strategist, generate 3 innovative business ideas for a user with the following profile:
    - Budget: ${budget}
    - Skills: ${skills}
    - Target Location: ${location}
    
    Return the response as a JSON array of objects, where each object has:
    - title (string)
    - description (string)
    - estimatedInvestment (string)
    - expectedProfitMargin (string)
    - demandLevel (string: High, Medium, Low)
    - reasonForLocation (string)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    res.json(JSON.parse(response.text || "[]"));
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate ideas" });
  }
});

router.post("/ai/chat", async (req, res) => {
  const { message, history } = req.body;
  const ai = getAi();
  if (!ai) return res.status(500).json({ error: "AI not configured" });

  try {
    const chat = ai.chats.create({
      model: "gemini-3.1-pro-preview",
      config: {
        systemInstruction: "You are an expert business advisor for 'OpportunityGap AI'. You help entrepreneurs analyze market gaps, suggest business ideas, and provide startup guidance based on local data.",
      }
    });

    // We'd normally pass history here, but for simplicity we just send the message
    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
});

export default router;
