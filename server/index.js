const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000", "https://tripease-frontend.onrender.com"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  };
  
app.use(cors(corsOptions));
app.use(express.json());

app.get("/test", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ message: "Backend is working and CORS is applied." });
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate-itinerary", async (req, res) => {
  const { location, budget, days, preferences } = req.body;

  try {
    const prompt = `Create a travel itinerary for ${days} days in ${location} with a budget of ${budget}. Preferences: ${preferences}.`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    const itinerary = chatCompletion.choices[0].message.content;
    res.json({ itinerary });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});