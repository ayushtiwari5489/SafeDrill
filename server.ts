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

    let responseText = "";
    let modelUsed = "gemini-3.8-flash";

    try {
      // Primary model: gemini-3.8-flash
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: userContent,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });
      responseText = response.text || "";
    } catch (primaryError: any) {
      console.warn("Primary model (gemini-3.8-flash) failed, attempting fallback to gemini-3.1-flash-lite:", primaryError?.message);
      try {
        modelUsed = "gemini-3.1-flash-lite";
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: userContent,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });
        responseText = fallbackResponse.text || "";
      } catch (fallbackError: any) {
        console.error("Both Gemini models failed, deploying intelligent offline disaster engine:", fallbackError?.message);
        // Fall back to the intelligent context-aware rule engine below
      }
    }

    if (responseText) {
      try {
        const parsedData = JSON.parse(responseText);
        res.json({
          success: true,
          source: modelUsed,
          ...parsedData,
        });
        return;
      } catch (parseError) {
        console.warn("JSON parsing failed on AI response:", parseError);
      }
    }

    // Context-Aware Emergency Fallback Engine (Guarantees user always gets immediate life-saving steps)
    const probLower = problem.toLowerCase();
    let emergencyTitle = "Immediate Emergency Safety Protocol";
    let calculatedSeverity: "CRITICAL" | "HIGH" | "MODERATE" = "HIGH";
    let steps: string[] = [];
    let doNots: string[] = [];
    let firstAid = "";

    if (probLower.includes("earthquake") || probLower.includes("quake") || probLower.includes("shake") || probLower.includes("tremor")) {
      emergencyTitle = "Earthquake Survival & Structural Hazard Protocol";
      calculatedSeverity = "CRITICAL";
      steps = [
        "1. DROP, COVER, and HOLD ON under a sturdy table, desk, or against an interior wall.",
        "2. Protect your head and neck with your arms or heavy books/backpack.",
        "3. Once shaking stops, evacuate using stairs only; check for gas smells or electrical sparks.",
        "4. Move to an open area clear of power lines, glass facades, and unreinforced chimneys."
      ];
      doNots = [
        "DO NOT run outside while the ground is actively shaking (falling glass/masonry causes most injuries).",
        "DO NOT use elevators under any circumstances.",
        "DO NOT light matches or flick light switches in case of ruptured gas pipes."
      ];
    } else if (probLower.includes("fire") || probLower.includes("smoke") || probLower.includes("burn") || probLower.includes("flame")) {
      emergencyTitle = "Structure Fire & Smoke Inhalation Protocol";
      calculatedSeverity = "CRITICAL";
      steps = [
        "1. Stay low to the ground (crawl below smoke where breathable air remains).",
        "2. Feel closed doors with the back of your hand before opening—if hot, keep closed and find an alternate exit.",
        "3. Evacuate immediately and pull the nearest manual fire pull station.",
        "4. If clothes catch fire: STOP, DROP, and ROLL immediately to smother flames."
      ];
      doNots = [
        "DO NOT inhale rising toxic black smoke—cover mouth/nose with a wet cloth if possible.",
        "DO NOT re-enter a burning building for pets or personal valuables.",
        "DO NOT open hot doors or throw water on kitchen grease or electrical fires."
      ];
      firstAid = "For minor thermal burns, cool under clean running water for 10-20 minutes. Never apply ice, butter, or oil.";
    } else if (probLower.includes("gas") || probLower.includes("lpg") || probLower.includes("smell") || probLower.includes("leak") || probLower.includes("cylinder")) {
      emergencyTitle = "LPG / Natural Gas Leak Immediate Containment";
      calculatedSeverity = "CRITICAL";
      steps = [
        "1. Open all exterior windows and doors wide to ventilate the accumulated gas.",
        "2. Shut off the gas cylinder regulator or main emergency gas meter valve immediately.",
        "3. Evacuate all occupants and pets to fresh air outside at a safe distance.",
        "4. Call the Emergency Gas Helpline and 112 from OUTSIDE the building."
      ];
      doNots = [
        "DO NOT turn any electrical light switches ON or OFF (sparks can ignite fuel-air vapor).",
        "DO NOT light matches, lighters, or use mobile phones inside the affected room.",
        "DO NOT ring doorbells or start vehicle engines nearby."
      ];
    } else if (probLower.includes("cpr") || probLower.includes("unconscious") || probLower.includes("collapse") || probLower.includes("breath") || probLower.includes("heart")) {
      emergencyTitle = "Adult Cardiac Arrest & Unconscious Bystander Protocol";
      calculatedSeverity = "CRITICAL";
      steps = [
        "1. Shake shoulders firmly and shout: 'Are you okay?' Check for normal chest rise/breathing (max 10 seconds).",
        "2. Call 112 / 108 immediately or point to a specific person: 'Call 112 and find an AED!'",
        "3. Place heel of one hand in the center of the chest, interlock fingers, lock elbows straight.",
        "4. Push hard and fast at 100-120 BPM (to the beat of 'Stayin Alive') at 5-6 cm depth with full recoil."
      ];
      doNots = [
        "DO NOT stop compressions for more than 10 seconds until paramedics arrive or AED arrives.",
        "DO NOT give food, liquids, or place pills in an unconscious person's mouth.",
        "DO NOT bend elbows while compressing; use upper body weight."
      ];
      firstAid = "Perform Hands-Only CPR without interruption: 100-120 compressions/min until help arrives.";
    } else if (probLower.includes("flood") || probLower.includes("water") || probLower.includes("submerged") || probLower.includes("drown")) {
      emergencyTitle = "Flash Flood & Rapid Inundation Protocol";
      calculatedSeverity = "HIGH";
      steps = [
        "1. Move immediately to the highest accessible floor or rooftop; take emergency essentials.",
        "2. Turn off the main electrical breaker before water reaches outlets to prevent electrocution.",
        "3. Avoid walking or driving through moving floodwaters ('Turn Around, Don't Drown').",
        "4. Signal rescue teams with a bright cloth, whistle, or flashlight from upper windows."
      ];
      doNots = [
        "DO NOT drive into floodwaters—just 6 inches of moving water can knock you down, and 12 inches can sweep a car.",
        "DO NOT touch submerged electrical wiring, breaker panels, or appliances.",
        "DO NOT drink tap or flood water (assume severe contamination)."
      ];
    } else {
      steps = [
        "1. Assess scene safety: Ensure you and others are not in immediate physical danger from hazards.",
        "2. Call National Emergency Services (Dial 112 / 100 / 101 / 108) and state your exact location.",
        "3. Administer immediate first aid for severe bleeding or airway obstruction if safe to do so.",
        "4. Follow instructions from emergency responders and keep mobile line clear."
      ];
      doNots = [
        "DO NOT place yourself into dangerous conditions without proper rescue gear.",
        "DO NOT move victims with suspected spinal/neck injuries unless there is an imminent fire or structural collapse risk.",
        "DO NOT circulate unverified rumors or panic in crowded spaces."
      ];
    }

    res.json({
      success: true,
      source: "safedrill_emergency_engine",
      severity: calculatedSeverity,
      title: emergencyTitle,
      immediateSteps: steps,
      doNots: doNots,
      helplineNumbers: [
        { name: "National Emergency (Universal)", number: "112" },
        { name: "Police Dispatch", number: "100" },
        { name: "Fire & Rescue Service", number: "101" },
        { name: "Medical / Ambulance", number: "108 / 102" },
        { name: "Disaster Management Authority", number: "1078" },
      ],
      medicalFirstAid: firstAid,
      safetyTips: "Remain calm, keep your phone in battery-saver mode, and follow official NDRF/ERSS directives.",
    });
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
