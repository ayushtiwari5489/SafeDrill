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

// Short Answer Evaluation Route (AI Disaster Preparedness Learning Engine)
app.post("/api/evaluate-short-answer", async (req, res) => {
  try {
    const { 
      scenario, 
      question, 
      userAnswer, 
      expectedConcepts = [], 
      category = "general",
      ageGroup = "11-14",
      difficulty = 2 
    } = req.body;

    if (!userAnswer || typeof userAnswer !== "string" || !userAnswer.trim()) {
      res.status(400).json({ error: "Please provide a valid answer to evaluate." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const ai = getGenAI();
      const systemInstruction = `You are the Disaster Preparedness Learning Evaluator for children and young students (approx. age ${ageGroup}).
Your mission is to evaluate the learner's short-answer safety response to a realistic emergency scenario.

CORE LEARNING PHILOSOPHY:
The system teaches: RECOGNIZE → PROTECT → RESPOND → EVACUATE IF INSTRUCTED → ASSEMBLE → COMMUNICATE → WAIT FOR INSTRUCTIONS.
Prioritize:
1. Immediate personal protection & calm.
2. Following instructions from teachers, parents, emergency personnel.
3. Moving away from hazards safely.
4. Alerting responsible adults rather than attempting heroic rescue.
5. Evacuating along designated routes to assembly points.
6. NEVER re-entering dangerous buildings or touching floodwaters/downed wires.

CRITICAL EVALUATION RULES:
- Use semantic evaluation: Do NOT require exact words or perfect grammar. Accept reasonable variations in wording.
- Never shame the learner. If incorrect or risky, use encouraging, supportive phrasing (e.g., "Good attempt, but...", "Not the safest choice because...").
- Calculate an honest score (0 to 100):
  * 80-100: Safe, understands the core emergency procedure.
  * 50-79: Partially safe, got some elements right but missed crucial steps.
  * 0-49: Unsafe, recommended action puts them or others in direct hazard (e.g. running outside during quakes, taking elevator, going back for a phone, wading into floodwater).
- Status must be one of: "SAFE", "PARTIALLY_SAFE", "UNSAFE".
- Provide 2-4 concrete "betterOptions" (safer alternative actions based on disaster safety guidelines).
- Provide a concise "safetyPrinciple" (1 life-saving rule takeaway).
- Provide a "followUpQuestion" for continuing situational awareness.

Return ONLY a valid JSON object matching this schema:
{
  "status": "SAFE" | "PARTIALLY_SAFE" | "UNSAFE",
  "score": number,
  "overallAssessment": "Short encouraging assessment phrase",
  "conceptsIdentified": ["Concept 1 child covered", "Concept 2"],
  "conceptsMissed": ["Vital concept 1 they missed", "Vital concept 2"],
  "feedback": "2-3 sentences of constructive, age-appropriate educational feedback",
  "betterOptions": ["Better option 1", "Better option 2", "Better option 3"],
  "safetyPrinciple": "Core life-saving rule summary",
  "followUpQuestion": "Follow-up question for continuous learning"
}`;

      const userPrompt = `DISASTER SCENARIO:
"${scenario}"

QUESTION ASKED:
"${question}"

EXPECTED SAFETY CONCEPTS:
${expectedConcepts.map((c: string) => `- ${c}`).join("\n")}

LEARNER'S ANSWER:
"${userAnswer}"

Evaluate the answer now based on the safety principles.`;

      let responseText = "";
      let modelUsed = "gemini-3.8-flash";

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: userPrompt,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });
        responseText = response.text || "";
      } catch (geminiError: any) {
        console.warn("Primary gemini-3.8-flash failed, trying gemini-3.1-flash-lite:", geminiError?.message);
        try {
          modelUsed = "gemini-3.1-flash-lite";
          const fallbackRes = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: userPrompt,
            config: {
              systemInstruction,
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          });
          responseText = fallbackRes.text || "";
        } catch (fbError: any) {
          console.error("Gemini evaluation error, using fallback engine:", fbError?.message);
        }
      }

      if (responseText) {
        try {
          const parsed = JSON.parse(responseText);
          res.json({
            success: true,
            source: modelUsed,
            ...parsed,
          });
          return;
        } catch (e) {
          console.warn("Failed to parse Gemini short answer evaluation JSON:", e);
        }
      }
    }

    // Semantic Rule-Based Evaluation Fallback (Guaranteed immediate feedback)
    const lowerAns = userAnswer.toLowerCase();
    const identified: string[] = [];
    const missed: string[] = [];

    // Check against expected concepts
    expectedConcepts.forEach((concept: string) => {
      const words = concept.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
      const matches = words.filter((w) => lowerAns.includes(w));
      if (matches.length >= 1) {
        identified.push(concept);
      } else {
        missed.push(concept);
      }
    });

    // Check for obvious red flags
    const hasUnsafeRunning = (lowerAns.includes("run") || lowerAns.includes("sprint")) && category === "earthquake";
    const hasElevator = lowerAns.includes("elevator") || lowerAns.includes("lift");
    const hasReturnForBag = (lowerAns.includes("go back") || lowerAns.includes("return") || lowerAns.includes("get my bag") || lowerAns.includes("phone")) && category === "evacuation";
    const hasWadingFlood = (lowerAns.includes("walk through") || lowerAns.includes("wade") || lowerAns.includes("swim") || lowerAns.includes("cross")) && category === "flood";
    const hasHeroicAction = lowerAns.includes("fight the fire") || lowerAns.includes("rescue by myself") || lowerAns.includes("touch the wire");

    const isDangerous = hasUnsafeRunning || hasElevator || hasReturnForBag || hasWadingFlood || hasHeroicAction;

    let status: "SAFE" | "PARTIALLY_SAFE" | "UNSAFE" = "SAFE";
    let score = 85;
    let feedback = "Good decision! You demonstrated clear disaster awareness and prioritized personal safety.";

    if (isDangerous) {
      status = "UNSAFE";
      score = Math.max(25, 45 - missed.length * 5);
      feedback = "Not the safest choice. In real emergencies, this action introduces severe hazards (such as falling debris, smoke inhalation, or electrical shock). Always prioritize protection and follow official guidance.";
    } else if (identified.length >= 2 || missed.length === 0) {
      status = "SAFE";
      score = Math.min(100, 80 + identified.length * 7);
      feedback = `Great answer! You correctly recognized crucial safety moves like "${identified[0] || 'protecting yourself'}". Following standard emergency procedures keeps you and others safe.`;
    } else if (identified.length === 1) {
      status = "PARTIALLY_SAFE";
      score = 65;
      feedback = `Good start! You remembered to ${identified[0].toLowerCase()}, but you missed other important steps like ${missed[0] ? missed[0].toLowerCase() : 'following the evacuation procedure'}.`;
    } else {
      status = "PARTIALLY_SAFE";
      score = 55;
      feedback = "You gave a thoughtful response. However, disaster safety protocols recommend focusing immediately on protective actions and listening to emergency personnel.";
    }

    const betterOptions = [
      category === "earthquake" 
        ? "Drop, Cover, and Hold On under a sturdy desk away from windows."
        : category === "fire"
        ? "Crawl low beneath smoke and evacuate toward the designated assembly area."
        : category === "flood"
        ? "Turn Around, Don't Drown: Avoid moving water and stay on high ground."
        : "Stay calm, protect yourself, and follow instructions from responsible adults.",
      "Never use elevators or return to collect personal belongings during an active evacuation.",
      "Stay at the designated assembly point until official roll call is complete."
    ];

    res.json({
      success: true,
      source: "disaster_safety_semantic_engine",
      status,
      score,
      overallAssessment: status === "SAFE" ? "Outstanding Survival Decision" : status === "PARTIALLY_SAFE" ? "Partially Safe (Needs More Key Steps)" : "High Risk Action (Review Procedure)",
      conceptsIdentified: identified.length > 0 ? identified : ["Attempted realistic decision"],
      conceptsMissed: missed.slice(0, 3),
      feedback,
      betterOptions,
      safetyPrinciple: "RECOGNIZE → PROTECT → RESPOND: Follow instructions from responsible adults and never put yourself in harm's way.",
      followUpQuestion: "Once you reach the assembly point, what should you do if your friend is unaccounted for?"
    });
  } catch (error: any) {
    console.error("Error in /api/evaluate-short-answer:", error);
    res.status(500).json({
      error: "Unable to evaluate answer at this moment. Please try again.",
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
