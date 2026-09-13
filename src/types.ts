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

export interface VideoTimestamp {
  time: string;
  seconds: number;
  label: string;
}

export interface CourseVideo {
  id: string;
  title: string;
  organization: string;
  duration: string;
  youtubeId: string;
  description: string;
  keyTimestamps: VideoTimestamp[];
  level?: "Essential" | "Comprehensive" | "Pro";
  learningObjectives?: string[];
  instructorTip?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  category: "First Aid" | "Fire Safety" | "Natural Disaster" | "Preparedness";
  estimatedMinutes: number;
  badge: string;
  summary: string;
  interactiveType?: "cpr-metronome" | "fire-pass-sim" | "go-bag-builder" | "heimlich-steps";
  videos?: CourseVideo[];
  steps: CourseStep[];
  keyTakeaways: string[];
}

export type CourseLearningStep = 
  | "intro" 
  | "video" 
  | "guidelines" 
  | "drill" 
  | "scenarios" 
  | "assessment" 
  | "certificate";

export interface DrillOption {
  id: string;
  text: string;
  isAppropriate: boolean;
  actionFeedback: string;
  explanation: string;
  riskLevel?: "Low" | "Medium" | "High" | "Critical";
}

export interface DrillSituation {
  id: string;
  title: string;
  situation: string;
  context: string;
  environment: string;
  options: DrillOption[];
}

export interface ScenarioDecision {
  id: string;
  text: string;
  isBest: boolean;
  outcome: string;
  safetyTakeaway: string;
}

export interface CourseScenario {
  id: string;
  environment: "School" | "College" | "Home" | "Sports" | "Public" | "Workplace";
  locationTag: string;
  title: string;
  situation: string;
  dilemma: string;
  decisions: ScenarioDecision[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: "mcq" | "scenario" | "decision";
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  domainArea: string;
}

export interface CourseGuidelineContent {
  awarenessDisclaimer: string;
  coreSteps: {
    number: number;
    title: string;
    detail: string;
    actionCallout?: string;
    caution?: string;
  }[];
  dos: string[];
  donts: string[];
  warningBoxes: {
    title: string;
    text: string;
    level: "warning" | "danger" | "info";
  }[];
  emergencyDecisions: {
    condition: string;
    action: string;
  }[];
}

export interface CourseIntroContent {
  whatItIs: string;
  whyItMatters: string;
  goldenRule: string;
  recognizingEmergency: string[];
  helplineNumbers: {
    name: string;
    number: string;
    note: string;
  }[];
  authorityReference: string;
}

export interface CourseProgressRecord {
  introCompleted: boolean;
  videoCompleted: boolean;
  guidelinesCompleted: boolean;
  drillCompleted: boolean;
  drillScore?: number;
  scenariosCompleted: boolean;
  assessmentCompleted: boolean;
  assessmentScore?: number;
  passed: boolean;
  certificateId?: string;
  completionDate?: string;
  learnerName?: string;
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
