export type TabType = "quiz" | "courses" | "emergency-bot" | "go-bag";

export type LocationType = 
  | "school" 
  | "highrise" 
  | "metro" 
  | "home" 
  | "mall" 
  | "outdoors";

export type DisasterType = 
  | "earthquake" 
  | "fire" 
  | "flood" 
  | "cyclone" 
  | "chemical" 
  | "stampede" 
  | "tsunami";

export interface DecisionOption {
  id: "A" | "B";
  text: string;
  isCorrect: boolean;
  consequence: string;
  survivalTip: string;
}

export interface ScenarioQuestion {
  id: string;
  location: LocationType;
  locationName: string;
  disaster: DisasterType;
  disasterName: string;
  situation: string;
  contextDescription: string;
  urgencySeconds?: number;
  options: [DecisionOption, DecisionOption]; // Strict 2 options
  didYouKnow?: string;
  dangerLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
}

export interface CourseStep {
  stepNumber: number;
  title: string;
  description: string;
  actionCallout: string;
  proTip?: string;
  caution?: string;
  iconName: string;
}

export interface CourseModule {
  id: string;
  title: string;
  category: "First Aid" | "Fire Safety" | "Natural Disaster" | "Preparedness";
  estimatedMinutes: number;
  badge: string;
  summary: string;
  interactiveType?: "cpr-metronome" | "fire-pass-sim" | "go-bag-builder" | "heimlich-steps";
  steps: CourseStep[];
  keyTakeaways: string[];
}

export interface EmergencyBotResponse {
  success: boolean;
  source?: string;
  severity: "CRITICAL" | "HIGH" | "MODERATE" | "ADVISORY";
  title: string;
  immediateSteps: string[];
  doNots: string[];
  helplineNumbers: { name: string; number: string }[];
  medicalFirstAid?: string;
  safetyTips?: string;
  error?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "system";
  text?: string;
  response?: EmergencyBotResponse;
  timestamp: string;
  isLoading?: boolean;
}

export interface GoBagItem {
  id: string;
  category: "Water & Food" | "First Aid & Meds" | "Tools & Power" | "Documents & Cash" | "Sanitation & Warmth";
  name: string;
  importance: "CRITICAL" | "HIGH" | "RECOMMENDED";
  description: string;
  packed: boolean;
}

export interface ShortAnswerScenario {
  id: string;
  category: "earthquake" | "fire" | "flood" | "storm" | "lightning" | "heat" | "evacuation" | "communication" | "bus";
  categoryLabel: string;
  ageGroup: "8-10" | "11-14" | "15-17";
  ageLabel: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  environment: string;
  scenario: string;
  question: string;
  questionType: "decision" | "explanation" | "recall" | "communication" | "preparation" | "reflection";
  expectedConcepts: string[];
  sampleGoodAnswer: string;
  betterOptions: string[];
  safetyPrinciple: string;
  didYouKnow?: string;
  followUpPrompt?: string;
}

export interface ShortAnswerEvaluationResult {
  success: boolean;
  source?: string;
  status: "SAFE" | "PARTIALLY_SAFE" | "UNSAFE";
  score: number; // 0 to 100
  overallAssessment: string;
  conceptsIdentified: string[];
  conceptsMissed: string[];
  feedback: string;
  betterOptions: string[];
  safetyPrinciple: string;
  followUpQuestion?: string;
}
