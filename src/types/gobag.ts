export type GoBagPriority = "CRITICAL" | "HIGH" | "USEFUL" | "OPTIONAL";

export type GoBagCategory =
  | "water"
  | "food"
  | "first_aid"
  | "lighting"
  | "power"
  | "communication"
  | "hygiene"
  | "clothing"
  | "weather"
  | "tools"
  | "documents"
  | "navigation"
  | "personal";

export type DisasterType =
  | "general"
  | "earthquake"
  | "flood"
  | "fire"
  | "cyclone"
  | "storm"
  | "blackout";

export interface GoBagMasterItem {
  id: string;
  name: string;
  category: GoBagCategory;
  categoryLabel: string;
  priority: GoBagPriority;
  approxWeightKg: number;
  description: string;
  whyItMatters: string;
  disasters: DisasterType[];
  subPersonalCategory?: "children" | "elderly" | "accessibility" | "pets" | "none";
  packed?: boolean;
}

export interface PersonalProfileAnswers {
  hasChildren: boolean;
  hasElderly: boolean;
  hasAccessibility: boolean;
  hasPets: boolean;
  climateZone: "moderate" | "cold" | "tropical";
}
