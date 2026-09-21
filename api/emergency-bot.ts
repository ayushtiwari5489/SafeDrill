import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: "nodejs",
};

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || "",
    });
  }
  return genAIClient;
}

export default async function handler(req: any, res: any) {
  // Support CORS for client requests
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST." });
    return;
  }

  try {
    const { problem, location, severity, history } = req.body || {};

    if (!problem || typeof problem !== "string") {
      res.status(400).json({ error: "Please provide a valid emergency description." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no API key is provided on Vercel, immediately return context-aware NDMA emergency protocols
    if (!apiKey) {
      const fallback = generateEmergencyFallback(problem);
      res.status(200).json({
        success: true,
        source: "offline_rules_engine (Add GEMINI_API_KEY to Vercel Environment Variables)",
        ...fallback,
      });
      return;
    }

    const ai = getGenAI();
    const systemPrompt = `You are SafeDrill AI, a certified Emergency Response & Disaster Management AI Assistant.
Your mission is to provide life-critical, concise, prioritized, and panic-reducing guidance for emergencies, natural disasters, accidents, and first aid situations.

Input parameters:
- User Problem / Situation: "${problem}"
- User Location Context: "${location || "Unspecified"}"
- User Declared Urgency: "${severity || "Unspecified"}"

Output Requirements:
Return a strictly valid JSON object conforming to this exact structure:
{
  "severity": "CRITICAL" | "HIGH" | "MODERATE" | "ADVISORY",
  "title": "Short punchy emergency title (e.g. Earthquake Trapped Protocol, Gas Leak Evacuation)",
  "immediateSteps": [
    "1. Immediate action with bold clarity",
    "2. Secondary crucial step",
    "3. Evacuation or stabilization step"
  ],
  "doNots": [
    "DO NOT do X (fatal mistake)",
    "DO NOT do Y"
  ],
  "helplineNumbers": [
    { "name": "Emergency Dispatch", "number": "112" },
    { "name": "Fire & Rescue", "number": "101" },
    { "name": "Medical / Ambulance", "number": "108 / 102" },
    { "name": "Police", "number": "100" },
    { "name": "Disaster Authority", "number": "1078" }
  ],
  "medicalFirstAid": "Specific immediate first aid instruction if applicable (or empty string)",
  "safetyTips": "A 1-sentence calming reassurance with priority instruction."
}

Rules:
1. Always prioritize human life and immediate scene safety.
2. Put the most critical life-saving action as item 1 in immediateSteps.
3. Highlight at least 2 fatal mistakes in doNots.
4. Output raw JSON only. No markdown fences, no explanatory preamble.`;

    let chatHistory = "";
    if (Array.isArray(history) && history.length > 0) {
      chatHistory = history
        .map((h: any) => `${h.role === "user" ? "Citizen" : "SafeDrill AI"}: ${h.content}`)
        .join("\n");
    }

    const userContent = chatHistory
      ? `Previous Context:\n${chatHistory}\n\nCurrent Emergency Message: ${problem}`
      : `Emergency Situation: ${problem} (Location: ${location || "Not specified"})`;

    let responseText = "";
    let modelUsed = "gemini-3.8-flash";

    try {
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
      console.warn("Primary model error, retrying fallback:", primaryError?.message);
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
        console.error("Gemini call failed on Vercel:", fallbackError?.message);
      }
    }

    if (responseText) {
      try {
        const parsed = JSON.parse(responseText);
        res.status(200).json({
          success: true,
          source: modelUsed,
          ...parsed,
        });
        return;
      } catch (e) {
        console.warn("JSON parse error:", e);
      }
    }

    // Context-aware fallback response
    const fallbackData = generateEmergencyFallback(problem);
    res.status(200).json({
      success: true,
      source: "safedrill_emergency_engine",
      ...fallbackData,
    });
  } catch (error: any) {
    console.error("Handler error on Vercel:", error);
    const fallbackData = generateEmergencyFallback("Emergency Incident");
    res.status(200).json({
      success: true,
      source: "emergency_failsafe",
      ...fallbackData,
    });
  }
}

function generateEmergencyFallback(problem: string) {
  const probLower = (problem || "").toLowerCase();
  let emergencyTitle = "Immediate Emergency Safety Protocol";
  let calculatedSeverity: "CRITICAL" | "HIGH" | "MODERATE" = "HIGH";
  let steps: string[] = [];
  let doNots: string[] = [];
  let firstAid = "";

  if (probLower.includes("earthquake") || probLower.includes("quake") || probLower.includes("shake") || probLower.includes("tremor")) {
    emergencyTitle = "Earthquake Survival & Structural Hazard Protocol";
    calculatedSeverity = "CRITICAL";
    steps = [
      "1. DROP, COVER, and HOLD ON under a sturdy desk or interior wall.",
      "2. Protect your head and neck with your arms or heavy backpack.",
      "3. Once shaking stops, evacuate using stairs only; check for gas smells or electrical sparks.",
      "4. Move to an open area clear of power lines, glass facades, and unreinforced chimneys.",
    ];
    doNots = [
      "DO NOT run outside while the ground is actively shaking (falling glass/masonry causes most injuries).",
      "DO NOT use elevators under any circumstances.",
      "DO NOT light matches or flick light switches in case of ruptured gas pipes.",
    ];
  } else if (probLower.includes("fire") || probLower.includes("smoke") || probLower.includes("burn") || probLower.includes("flame")) {
    emergencyTitle = "Structure Fire & Smoke Inhalation Protocol";
    calculatedSeverity = "CRITICAL";
    steps = [
      "1. Stay low to the ground (crawl below smoke where breathable air remains).",
      "2. Feel closed doors with the back of your hand before opening—if hot, keep closed and find an alternate exit.",
      "3. Evacuate immediately and pull the nearest manual fire pull station.",
      "4. If clothes catch fire: STOP, DROP, and ROLL immediately to smother flames.",
    ];
    doNots = [
      "DO NOT inhale rising toxic black smoke—cover mouth/nose with a wet cloth if possible.",
      "DO NOT re-enter a burning building for pets or personal valuables.",
      "DO NOT open hot doors or throw water on kitchen grease or electrical fires.",
    ];
    firstAid = "For minor thermal burns, cool under clean running water for 10-20 minutes. Never apply ice, butter, or oil.";
  } else if (probLower.includes("gas") || probLower.includes("lpg") || probLower.includes("smell") || probLower.includes("leak") || probLower.includes("cylinder")) {
    emergencyTitle = "LPG / Natural Gas Leak Immediate Containment";
    calculatedSeverity = "CRITICAL";
    steps = [
      "1. Open all exterior windows and doors wide to ventilate the accumulated gas.",
      "2. Shut off the gas cylinder regulator or main emergency gas meter valve immediately.",
      "3. Evacuate all occupants and pets to fresh air outside at a safe distance.",
      "4. Call the Emergency Gas Helpline and 112 from OUTSIDE the building.",
    ];
    doNots = [
      "DO NOT turn any electrical light switches ON or OFF (sparks can ignite fuel-air vapor).",
      "DO NOT light matches, lighters, or use mobile phones inside the affected room.",
      "DO NOT ring doorbells or start vehicle engines nearby.",
    ];
  } else if (probLower.includes("cpr") || probLower.includes("unconscious") || probLower.includes("collapse") || probLower.includes("breath") || probLower.includes("heart")) {
    emergencyTitle = "Adult Cardiac Arrest & Unconscious Bystander Protocol";
    calculatedSeverity = "CRITICAL";
    steps = [
      "1. Shake shoulders firmly and shout: 'Are you okay?' Check for breathing (max 10 seconds).",
      "2. Call 112 / 108 immediately: 'Person unconscious, not breathing!'",
      "3. Place heel of one hand in the center of the chest, interlock fingers, lock elbows straight.",
      "4. Push hard and fast at 100-120 BPM (to the beat of 'Stayin Alive') at 5-6 cm depth with full recoil.",
    ];
    doNots = [
      "DO NOT stop compressions for more than 10 seconds until paramedics or AED arrives.",
      "DO NOT give food, liquids, or place pills in an unconscious person's mouth.",
      "DO NOT bend elbows while compressing; use upper body weight.",
    ];
    firstAid = "Perform Hands-Only CPR without interruption: 100-120 compressions/min until help arrives.";
  } else {
    steps = [
      "1. Assess scene safety: Ensure you and others are not in immediate danger.",
      "2. Call National Emergency Services (Dial 112 / 100 / 101 / 108) and state your exact location.",
      "3. Administer immediate first aid for severe bleeding or airway obstruction if safe to do so.",
      "4. Follow instructions from emergency responders and keep mobile line clear.",
    ];
    doNots = [
      "DO NOT place yourself into dangerous conditions without proper rescue gear.",
      "DO NOT move victims with suspected spinal/neck injuries unless there is an imminent fire risk.",
      "DO NOT circulate unverified rumors in crowded spaces.",
    ];
  }

  return {
    severity: calculatedSeverity,
    title: emergencyTitle,
    immediateSteps: steps,
    doNots: doNots,
    helplineNumbers: [
      { name: "Universal Emergency", number: "112" },
      { name: "Police Dispatch", number: "100" },
      { name: "Fire & Rescue", number: "101" },
      { name: "Ambulance / Medical", number: "108 / 102" },
      { name: "Disaster Authority", number: "1078" },
    ],
    medicalFirstAid: firstAid,
    safetyTips: "Remain calm, keep phone in battery-saver mode, and follow official emergency directives.",
  };
}
