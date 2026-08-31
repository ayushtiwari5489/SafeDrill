import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Google GenAI client setup
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set in environment.");
    }
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check API
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "SafeDrill",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Emergency AI Bot Route
app.post("/api/emergency-bot", async (req, res) => {
  try {
    const { problem, location, severity, history } = req.body;

    if (!problem || typeof problem !== "string") {
      res.status(400).json({ error: "Please provide a valid emergency description." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return structured fallback response if API key is not configured
      res.json({
        success: true,
        source: "offline_rules_engine",
        severity: "HIGH",
        title: "Immediate Emergency Safety Protocol",
        immediateSteps: [
          "1. Ensure scene safety: Move to high ground, open spaces, or away from collapsing debris/fire.",
          "2. Call Local Emergency Services immediately (Dial 112 / 911 / 100 / 101).",
          "3. If injuries exist, apply direct firm pressure on severe bleeding using clean cloth.",
          "4. Keep communication channels open and stay low if smoke is present.",
        ],
        doNots: [
          "DO NOT use elevators during fires, earthquakes, or flooding.",
          "DO NOT touch exposed electrical wires or water near downed lines.",
          "DO NOT re-enter damaged buildings until authorized by emergency responders.",
        ],
        helplineNumbers: [
          { name: "National Emergency (Universal)", number: "112" },
          { name: "Police", number: "100 / 911" },
          { name: "Fire & Rescue", number: "101" },
          { name: "Ambulance / Medical", number: "102 / 108" },
          { name: "Disaster Management Authority", number: "1078" },
        ],
        safetyTips: "Stay calm, conserve phone battery, and assist children or elderly individuals nearby if safe to do so.",
      });
      return;
    }

    const ai = getGenAI();
    const systemPrompt = `You are SafeDrill AI, a certified Emergency Response & Disaster Management AI Assistant.
Your mission is to provide life-critical, concise, prioritized, and panic-reducing guidance for emergencies, natural disasters, accidents, and first aid situations.

Input parameters:
- User Problem / Situation: "${problem}"
- User Location Context: "${location || 'Unspecified'}"
- User Declared Urgency: "${severity || 'Unspecified'}"

Output Requirements:
Return a strictly valid JSON object conforming to this exact structure:
{
  "severity": "CRITICAL" | "HIGH" | "MODERATE" | "ADVISORY",
  "title": "Short punchy emergency title (e.g. Earthquake Trapped Protocol, Gas Leak Evacuation)",
  "immediateSteps": [
    "1. Immediate action with bold clarity",
    "2. Next critical move",
    "3. Life-saving action"
  ],
  "doNots": [
    "DO NOT do this dangerous action",
    "DO NOT make this common mistake"
  ],
  "helplineNumbers": [
    { "name": "Emergency Service Name", "number": "112 / 911" }
  ],
  "medicalFirstAid": "Specific first-aid instructions if someone is injured or choking, otherwise empty string",
  "safetyTips": "Short reassurance and key precautions (under 30 words)"
}

Style Guidelines:
- High urgency: Put the single most critical physical life-saving step as Step 1.
- Clear, simple words so someone experiencing high adrenaline can easily understand.
- Do NOT use technical jargon.
- Emphasize calling official authorities early.`;

    const chatHistory = Array.isArray(history)
      ? history.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join("\n")
      : "";

    const userContent = chatHistory
      ? `Previous Context:\n${chatHistory}\n\nCurrent Emergency Message: ${problem}`
      : `Emergency Situation: ${problem} (Location: ${location || "Not specified"})`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userContent,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const responseText = response.text || "";
    try {
      const parsedData = JSON.parse(responseText);
      res.json({
        success: true,
        source: "gemini-3.7-flash",
        ...parsedData,
      });
    } catch {
      // Fallback if parsing fails
      res.json({
        success: true,
        source: "gemini-raw",
        severity: "HIGH",
        title: "Emergency Safety Guidance",
        immediateSteps: [
          "1. Assess scene safety and protect yourself first.",
          "2. Call emergency dispatch (112 or local 911/100).",
          "3. Follow standard disaster evacuation/first-aid protocols.",
        ],
        doNots: [
          "Do not panic or rush into hazardous areas without visibility.",
          "Do not use elevators during emergencies.",
        ],
        helplineNumbers: [
          { name: "Emergency Dispatch", number: "112" },
          { name: "Police", number: "100 / 911" },
          { name: "Fire", number: "101" },
          { name: "Ambulance", number: "108 / 102" },
        ],
        safetyTips: responseText.slice(0, 200),
      });
    }
  } catch (error: any) {
    console.error("Error in /api/emergency-bot:", error);
    res.status(500).json({
      error: "Emergency Assistant temporarily encountered a network issue. Please call your local emergency services (112 / 911 / 100).",
      details: error?.message || "Unknown error",
    });
  }
});

// Setup Vite development middleware or static asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SafeDrill] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
