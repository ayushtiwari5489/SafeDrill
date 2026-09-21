import { GoBagMasterItem, DisasterType } from "../types/gobag";

export const GO_BAG_MASTER_ITEMS: GoBagMasterItem[] = [
  // --- 1. WATER (CRITICAL) ---
  {
    id: "water_drinking",
    name: "Drinking Water (3 Liters / Pouches or Bottles)",
    category: "water",
    categoryLabel: "Water",
    priority: "CRITICAL",
    approxWeightKg: 3.0,
    description: "Sealed potable water pouches or durable bottles (approx 1L per person/day bare minimum).",
    whyItMatters: "During disasters, municipal pipes break, pump stations lose power, and tap water easily gets contaminated with sewage. Dehydration sets in rapidly in stressful evacuations.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm", "blackout"]
  },
  {
    id: "water_purification_tablets",
    name: "Water Purification Tablets (Chlorine / Aquatabs)",
    category: "water",
    categoryLabel: "Water",
    priority: "HIGH",
    approxWeightKg: 0.05,
    description: "Compact blister pack of water disinfection tablets for treating refilled clear water.",
    whyItMatters: "Water is heavy to haul. Tablets allow you to safely disinfect collected tap water at public shelters. Note: Purification eliminates microbiological pathogens, not chemical toxins.",
    disasters: ["flood", "cyclone", "storm", "earthquake", "general"]
  },
  {
    id: "water_filter_portable",
    name: "Portable Straw Filter or Micro-Filter",
    category: "water",
    categoryLabel: "Water",
    priority: "USEFUL",
    approxWeightKg: 0.15,
    description: "Lightweight 0.1-micron hollow-fiber membrane filter.",
    whyItMatters: "Allows continuous safe water filtration on the go without waiting for tablet dissolving times.",
    disasters: ["flood", "earthquake", "storm", "general"]
  },
  {
    id: "water_collapsible_bottle",
    name: "Collapsible Water Bottle / Pouch",
    category: "water",
    categoryLabel: "Water",
    priority: "USEFUL",
    approxWeightKg: 0.1,
    description: "Flexible, fold-flat reusable water canteen with secure cap.",
    whyItMatters: "Takes virtually zero space and weight when empty, enabling instant refill when aid trucks arrive.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone"]
  },

  // --- 2. FOOD (HIGH / CRITICAL) ---
  {
    id: "food_ready_rations",
    name: "Ready-to-Eat Non-Perishable Food",
    category: "food",
    categoryLabel: "Food",
    priority: "CRITICAL",
    approxWeightKg: 0.9,
    description: "Ready-to-eat pouches, vacuum meals, or high-density food rations requiring zero stove, gas, or prep.",
    whyItMatters: "Cooking gas lines are shut off during quakes, power lines snap, and cooking in shelters is often prohibited.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm", "blackout"]
  },
  {
    id: "food_energy_bars",
    name: "High-Calorie Energy & Protein Bars",
    category: "food",
    categoryLabel: "Food",
    priority: "HIGH",
    approxWeightKg: 0.4,
    description: "Nutritious protein and granola bars with long shelf lives.",
    whyItMatters: "Compact, immediate calories you can consume while walking, evacuating, or resting in transit.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm"]
  },
  {
    id: "food_dry_snacks",
    name: "Dry Trail Mix, Nuts & Dried Fruits",
    category: "food",
    categoryLabel: "Food",
    priority: "USEFUL",
    approxWeightKg: 0.35,
    description: "High-density healthy fats and sugars that don't spoil or melt easily.",
    whyItMatters: "Sustains blood sugar levels during prolonged physical exertion without refrigeration.",
    disasters: ["general", "earthquake", "cyclone", "storm"]
  },
  {
    id: "food_can_opener",
    name: "Manual Can Opener & Spoon",
    category: "food",
    categoryLabel: "Food",
    priority: "USEFUL",
    approxWeightKg: 0.08,
    description: "Simple manual hand-crank or butterfly can opener with durable utensil.",
    whyItMatters: "Relief donations often contain canned goods with no pull-tabs. An electric opener won't work in blackouts.",
    disasters: ["general", "flood", "earthquake", "blackout"]
  },

  // --- 3. FIRST AID & ESSENTIAL MEDICATIONS (CRITICAL) ---
  {
    id: "med_personal_prescriptions",
    name: "Personal Prescribed Medications (7-Day Supply)",
    category: "first_aid",
    categoryLabel: "First Aid & Meds",
    priority: "CRITICAL",
    approxWeightKg: 0.2,
    description: "Your daily prescription medications: blood pressure pills, insulin, asthma inhalers, cardiac meds.",
    whyItMatters: "Pharmacies close immediately during disasters and supply chains break. Missing life-sustaining doses causes medical emergencies far faster than external hazards.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm", "blackout"]
  },
  {
    id: "first_aid_basic_kit",
    name: "Compact First Aid Kit (Bandages, Gauze, Tape, Gloves)",
    category: "first_aid",
    categoryLabel: "First Aid & Meds",
    priority: "CRITICAL",
    approxWeightKg: 0.4,
    description: "Adhesive bandages in assorted sizes, sterile gauze pads, medical tape, antiseptic wipes, disposable nitrile gloves.",
    whyItMatters: "Broken glass, splintered lumber, and jagged debris cause lacerations in nearly every earthquake or flood. Unchecked minor cuts quickly become infected in humid, unsanitary post-disaster shelters.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm"]
  },
  {
    id: "first_aid_blister_antiseptic",
    name: "Antiseptic Spray & Blister Treatment",
    category: "first_aid",
    categoryLabel: "First Aid & Meds",
    priority: "USEFUL",
    approxWeightKg: 0.1,
    description: "Topical disinfectant wipes and moleskin/hydrocolloid blister patches.",
    whyItMatters: "Evacuations on foot over multiple miles create debilitating blisters and skin abrasions.",
    disasters: ["general", "flood", "fire", "earthquake"]
  },

  // --- 4. LIGHTING (HIGH / CRITICAL) ---
  {
    id: "light_led_flashlight",
    name: "Durable LED Flashlight & Spare Batteries",
    category: "lighting",
    categoryLabel: "Lighting",
    priority: "HIGH",
    approxWeightKg: 0.25,
    description: "Sturdy, waterproof LED flashlight with fresh backup alkaline or lithium cells.",
    whyItMatters: "Power grids trip instantly. Navigating broken glass, flooded streets, or smoke-filled corridors in total darkness is dangerous and disorienting.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm", "blackout"]
  },
  {
    id: "light_headlamp",
    name: "Hands-Free LED Headlamp",
    category: "lighting",
    categoryLabel: "Lighting",
    priority: "HIGH",
    approxWeightKg: 0.15,
    description: "Adjustable headband lamp allowing both hands free to carry children, pets, or climb stairs.",
    whyItMatters: "Hands-free illumination is essential when descending stairwells, carrying a family member, or applying first aid in the dark.",
    disasters: ["earthquake", "fire", "storm", "blackout", "general"]
  },
  {
    id: "light_glowstick_backup",
    name: "Small Backup Light / Chemical Glow Stick",
    category: "lighting",
    categoryLabel: "Lighting",
    priority: "OPTIONAL",
    approxWeightKg: 0.08,
    description: "Spark-free chemical snap-light or mini keychain beacon.",
    whyItMatters: "Safe to illuminate areas with suspected natural gas leaks where electrical switches could trigger sparks.",
    disasters: ["earthquake", "blackout", "general"]
  },

  // --- 5. POWER & ELECTRONICS (HIGH) ---
  {
    id: "power_bank_high_cap",
    name: "10,000–20,000mAh Power Bank (Pre-Charged)",
    category: "power",
    categoryLabel: "Power & Phone",
    priority: "HIGH",
    approxWeightKg: 0.35,
    description: "Quality lithium power bank kept topped up to recharge smartphones at least 2–3 times.",
    whyItMatters: "Your phone holds offline maps, family contact details, flashlights, and emergency alert receivers. Once its battery dies, your personal connectivity is gone.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm", "blackout"]
  },
  {
    id: "power_cables_set",
    name: "Braided Charging Cables (USB-C / Lightning / Micro)",
    category: "power",
    categoryLabel: "Power & Phone",
    priority: "HIGH",
    approxWeightKg: 0.08,
    description: "Durable multi-connector charging cable stored in a waterproof zip sleeve.",
    whyItMatters: "A power bank is useless without a compatible charging cord.",
    disasters: ["general", "blackout", "cyclone", "flood"]
  },
  {
    id: "power_backup_wall_adapter",
    name: "Compact Dual-Port Wall Charger",
    category: "power",
    categoryLabel: "Power & Phone",
    priority: "USEFUL",
    approxWeightKg: 0.09,
    description: "Fast-charging wall block for rapidly topping up batteries if you reach a public relief shelter with a generator.",
    whyItMatters: "Shelters have limited outlets; a multi-port plug allows you to share and quickly charge multiple devices.",
    disasters: ["general", "cyclone", "flood", "blackout"]
  },

  // --- 6. COMMUNICATION (HIGH / CRITICAL) ---
  {
    id: "comm_radio_crank",
    name: "Battery-Powered or Hand-Crank Emergency Radio",
    category: "communication",
    categoryLabel: "Communication",
    priority: "HIGH",
    approxWeightKg: 0.38,
    description: "Compact AM/FM/NOAA weather radio with manual hand-crank and solar backup option.",
    whyItMatters: "Cellular towers and cellular data networks fail or suffer massive congestion during major crises. Terrestrial radio broadcasts are often the sole operational channel for civil defense alerts.",
    disasters: ["general", "earthquake", "flood", "cyclone", "storm", "blackout"]
  },
  {
    id: "comm_whistle_pealess",
    name: "Loud Pea-less Emergency Whistle",
    category: "communication",
    categoryLabel: "Communication",
    priority: "CRITICAL",
    approxWeightKg: 0.04,
    description: "High-decibel emergency whistle (no pea inside that can freeze or clog).",
    whyItMatters: "Shouting for help exhausts your lungs and voice in under 20 minutes, while inhaling dangerous dust. A whistle creates a piercing sound audible through rubble and storm winds using minimal lung capacity.",
    disasters: ["earthquake", "flood", "storm", "general"]
  },
  {
    id: "comm_contact_card",
    name: "Laminated Emergency Contact Card & Out-of-Area Number",
    category: "communication",
    categoryLabel: "Communication",
    priority: "CRITICAL",
    approxWeightKg: 0.02,
    description: "Physical printed card with phone numbers, medical conditions, and an out-of-state emergency family contact.",
    whyItMatters: "Most people no longer memorize phone numbers. If your phone dies, gets lost, or drops in water, you cannot recall crucial numbers to dial from a rescue shelter.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm"]
  },

  // --- 7. HYGIENE & SANITATION (HIGH / USEFUL) ---
  {
    id: "hygiene_sanitizer_soap",
    name: "Hand Sanitizer & Small Biodegradable Soap",
    category: "hygiene",
    categoryLabel: "Hygiene",
    priority: "HIGH",
    approxWeightKg: 0.15,
    description: "Alcohol-based hand sanitizer bottle (min 60%) plus a small travel soap bar.",
    whyItMatters: "Post-disaster disease outbreaks (gastroenteritis, cholera, dysentery) spread rapidly when running water is cut. Clean hands prevent sickness when eating ration food.",
    disasters: ["flood", "earthquake", "cyclone", "general"]
  },
  {
    id: "hygiene_wet_wipes",
    name: "Wet Wipes & Pocket Tissues / Toilet Paper",
    category: "hygiene",
    categoryLabel: "Hygiene",
    priority: "HIGH",
    approxWeightKg: 0.25,
    description: "Moisture-sealed pack of disinfectant body wipes and a flattened roll of toilet paper in a ziplock bag.",
    whyItMatters: "Public shelter restrooms quickly run out of paper and running water. Personal wipes keep skin clean and prevent rashes.",
    disasters: ["general", "flood", "earthquake", "cyclone"]
  },
  {
    id: "hygiene_dental",
    name: "Travel Toothbrush & Toothpaste",
    category: "hygiene",
    categoryLabel: "Hygiene",
    priority: "USEFUL",
    approxWeightKg: 0.07,
    description: "Compact travel hygiene kit for basic oral comfort.",
    whyItMatters: "Basic oral hygiene provides a psychological boost of normalcy and dignity in crowded evacuation centers.",
    disasters: ["general"]
  },
  {
    id: "hygiene_menstrual",
    name: "Menstrual Hygiene Products",
    category: "hygiene",
    categoryLabel: "Hygiene",
    priority: "HIGH",
    approxWeightKg: 0.15,
    description: "Individually sealed pads, tampons, or menstrual cups sealed in waterproof plastic.",
    whyItMatters: "Shelter relief aid often experiences acute shortages of feminine hygiene products in the first 48–72 hours.",
    disasters: ["general", "flood", "earthquake", "cyclone"]
  },
  {
    id: "hygiene_waste_bags",
    name: "Heavy-Duty Trash / Small Waste Disposal Bags",
    category: "hygiene",
    categoryLabel: "Hygiene",
    priority: "USEFUL",
    approxWeightKg: 0.1,
    description: "4–6 durable black trash bags with twist ties.",
    whyItMatters: "Multipurpose: serves as sanitation disposal, a makeshift rain poncho, ground tarp, or waterproof pack liner.",
    disasters: ["general", "flood", "cyclone", "storm"]
  },

  // --- 8. CLOTHING (HIGH / USEFUL) ---
  {
    id: "cloth_change_underwear",
    name: "Change of Undergarments & Thermal Socks (2 Pairs)",
    category: "clothing",
    categoryLabel: "Clothing",
    priority: "HIGH",
    approxWeightKg: 0.35,
    description: "Clean moisture-wicking synthetic or wool socks and comfortable underwear in a compressed bag.",
    whyItMatters: "Wet feet lead to trench foot, fungal infections, and severe blisters when trekking across flooded or debris-covered roads.",
    disasters: ["general", "flood", "storm", "earthquake"]
  },
  {
    id: "cloth_sturdy_footwear",
    name: "Sturdy Walking Shoes / Boots (Keep beside bed/bag)",
    category: "clothing",
    categoryLabel: "Clothing",
    priority: "CRITICAL",
    approxWeightKg: 0.0, // Worn on feet, negligible bag weight
    description: "Closed-toe sneakers or hiking boots with puncture-resistant soles (placed right next to your bag).",
    whyItMatters: "Flipping over debris, glass shards, and nails barefoot or in flip-flops causes immediate puncture injuries that halt your evacuation.",
    disasters: ["earthquake", "flood", "fire", "cyclone", "general"]
  },
  {
    id: "cloth_warm_layer",
    name: "Lightweight Warm Layer / Fleece Jacket",
    category: "clothing",
    categoryLabel: "Clothing",
    priority: "HIGH",
    approxWeightKg: 0.45,
    description: "Lightweight fleece pullover or wind-resistant packable jacket.",
    whyItMatters: "Night temperatures drop sharply during outdoor wait times and power outages.",
    disasters: ["general", "cyclone", "storm", "earthquake"]
  },

  // --- 9. WEATHER PROTECTION (HIGH / CRITICAL) ---
  {
    id: "weather_emergency_blanket",
    name: "Mylar Thermal Space Blanket (Pack of 2)",
    category: "weather",
    categoryLabel: "Weather Protection",
    priority: "CRITICAL",
    approxWeightKg: 0.1,
    description: "Ultra-compact reflective mylar foil sheets that reflect up to 90% of radiant body heat.",
    whyItMatters: "Hypothermia can kill within hours even in 15°C (59°F) if wet and windy. Space blankets weigh almost nothing while preventing trauma shock.",
    disasters: ["general", "flood", "storm", "earthquake", "cyclone"]
  },
  {
    id: "weather_rain_poncho",
    name: "Heavy-Duty Reusable Rain Poncho with Hood",
    category: "weather",
    categoryLabel: "Weather Protection",
    priority: "HIGH",
    approxWeightKg: 0.2,
    description: "Compact waterproof hooded poncho fitting over both the wearer and the backpack.",
    whyItMatters: "Staying dry is the #1 defense against hypothermia during wet cyclonic storms and flood evacuations.",
    disasters: ["flood", "cyclone", "storm", "general"]
  },
  {
    id: "weather_sun_dust_protection",
    name: "Sunscreen & Polarized Sunglasses / Wide Hat",
    category: "weather",
    categoryLabel: "Weather Protection",
    priority: "USEFUL",
    approxWeightKg: 0.15,
    description: "SPF 50 sun protection lotion and UV-blocking eyewear.",
    whyItMatters: "Prolonged exposure during open-air staging areas or boat evacuations causes sunstroke and retinal glare fatigue.",
    disasters: ["flood", "cyclone", "general"]
  },

  // --- 10. BASIC PRACTICAL TOOLS (USEFUL) ---
  {
    id: "tools_multitool",
    name: "Compact Multi-Tool (Pliers, Screwdriver, Scissors, Blade)",
    category: "tools",
    categoryLabel: "Basic Tools",
    priority: "HIGH",
    approxWeightKg: 0.24,
    description: "Small stainless folding multipurpose tool (non-tactical; focus on utility).",
    whyItMatters: "Tightening loose bolts, cutting bindings, opening containers, and fixing gear without carrying a heavy toolbox.",
    disasters: ["general", "earthquake", "storm", "flood"]
  },
  {
    id: "tools_duct_tape_cord",
    name: "Small Roll of Duct Tape & Paracord (15m)",
    category: "tools",
    categoryLabel: "Basic Tools",
    priority: "USEFUL",
    approxWeightKg: 0.2,
    description: "Pocket-sized flat-wrapped duct tape and strong nylon utility cord.",
    whyItMatters: "Repairs torn backpacks, secures tarps against wind, hangs wet clothes, and splints makeshift shelters.",
    disasters: ["earthquake", "cyclone", "storm", "flood", "general"]
  },
  {
    id: "tools_waterproof_notebook_pen",
    name: "Waterproof Pocket Notepad & Ballpoint Pen",
    category: "tools",
    categoryLabel: "Basic Tools",
    priority: "USEFUL",
    approxWeightKg: 0.08,
    description: "All-weather small notebook with pen and permanent marker.",
    whyItMatters: "Leaves notes on front doors for search-and-rescue teams ('Family evacuated to Community Center on 14th Sept'), records medical timings.",
    disasters: ["general", "flood", "fire", "earthquake"]
  },

  // --- 11. DOCUMENTS & EMERGENCY CASH (CRITICAL) ---
  {
    id: "doc_waterproof_id_copies",
    name: "Waterproof Document Pouch (IDs, Deeds, Insurance, Medical)",
    category: "documents",
    categoryLabel: "Documents & Cash",
    priority: "CRITICAL",
    approxWeightKg: 0.25,
    description: "Heavy-duty ziplock pouch containing physical photocopies/USB of passports, national IDs, property deeds, and immunization cards.",
    whyItMatters: "Proves identity and home ownership when claiming government disaster aid, entering shelters, or filing insurance claims.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm"]
  },
  {
    id: "doc_emergency_cash_small_bills",
    name: "Emergency Cash in Small Bills & Coins",
    category: "documents",
    categoryLabel: "Documents & Cash",
    priority: "HIGH",
    approxWeightKg: 0.15,
    description: "Cash in small denominations ($5, $10, $20 or local small currency equivalents).",
    whyItMatters: "Credit card terminals, ATMs, and digital smartphone payments do not function during power blackouts or severed telecom fiber.",
    disasters: ["general", "earthquake", "flood", "fire", "cyclone", "storm", "blackout"]
  },

  // --- 12. NAVIGATION (USEFUL) ---
  {
    id: "nav_local_paper_map",
    name: "Physical Paper Map of Local Area & Evacuation Zones",
    category: "navigation",
    categoryLabel: "Navigation",
    priority: "HIGH",
    approxWeightKg: 0.1,
    description: "Printed topographic or street map marking official relief shelters and high-ground routes.",
    whyItMatters: "Online GPS and Google Maps fail when cell towers go dark or phone batteries deplete.",
    disasters: ["general", "flood", "earthquake", "fire", "cyclone"]
  },
  {
    id: "nav_basic_compass",
    name: "Simple Magnetic Compass",
    category: "navigation",
    categoryLabel: "Navigation",
    priority: "OPTIONAL",
    approxWeightKg: 0.05,
    description: "Small handheld liquid-damped orienteering compass.",
    whyItMatters: "Helps maintain general heading when familiar landmarks are destroyed or shrouded in thick smoke/fog.",
    disasters: ["flood", "fire", "general"]
  },

  // --- 13. PERSONALIZED REQUIREMENTS (CHILDREN, ELDERLY, PETS, ACCESSIBILITY) ---
  {
    id: "personal_baby_formula",
    name: "Baby Formula & Infant Bottles",
    category: "personal",
    categoryLabel: "Personal Needs",
    priority: "CRITICAL",
    approxWeightKg: 0.6,
    description: "Ready-to-feed or powdered infant formula with pre-sterilized bottles.",
    whyItMatters: "Babies cannot consume adult ration bars; infant nutrition is rarely supplied in early shelter deliveries.",
    disasters: ["general", "flood", "earthquake", "cyclone"],
    subPersonalCategory: "children"
  },
  {
    id: "personal_diapers_wipes",
    name: "Baby Diapers & Sensitive Wipes (3-Day Supply)",
    category: "personal",
    categoryLabel: "Personal Needs",
    priority: "CRITICAL",
    approxWeightKg: 0.5,
    description: "3-day supply of diapers, rash ointment, and baby hygiene wipes.",
    whyItMatters: "Essential to prevent diaper rash and infections in unsanitary conditions.",
    disasters: ["general", "flood", "earthquake"],
    subPersonalCategory: "children"
  },
  {
    id: "personal_child_comfort",
    name: "Child Comfort Toy & Small Coloring Book",
    category: "personal",
    categoryLabel: "Personal Needs",
    priority: "USEFUL",
    approxWeightKg: 0.2,
    description: "Small favorite stuffed animal, comfort blanket, or pocket game.",
    whyItMatters: "Disasters cause severe psychological trauma and anxiety in children. A familiar comfort item dramatically calms distress in chaotic shelters.",
    disasters: ["general", "earthquake", "flood", "cyclone"],
    subPersonalCategory: "children"
  },
  {
    id: "personal_elderly_glasses_hearing",
    name: "Spare Reading Glasses & Hearing Aid Batteries",
    category: "personal",
    categoryLabel: "Personal Needs",
    priority: "CRITICAL",
    approxWeightKg: 0.1,
    description: "Extra pair of prescription spectacles and spare button cells for hearing aids.",
    whyItMatters: "Loss of sight or hearing during evacuation leads to severe disorientation and inability to follow rescue directives.",
    disasters: ["general", "earthquake", "fire", "flood"],
    subPersonalCategory: "elderly"
  },
  {
    id: "personal_mobility_aid_parts",
    name: "Mobility Aid Accessories & Medical List",
    category: "personal",
    categoryLabel: "Personal Needs",
    priority: "CRITICAL",
    approxWeightKg: 0.3,
    description: "Spare cane tips, wheelchair tire patch kit, or portable catheter supplies.",
    whyItMatters: "A flat wheelchair tire or broken cane immediately immobilizes a person without specialized shelter gear.",
    disasters: ["general", "earthquake", "flood"],
    subPersonalCategory: "accessibility"
  },
  {
    id: "personal_pet_food_water",
    name: "Pet Food & Collapsible Bowl (3 Days)",
    category: "personal",
    categoryLabel: "Personal Needs",
    priority: "CRITICAL",
    approxWeightKg: 0.7,
    description: "3-day sealed dry pet food, lightweight water pouch, and silicone dish.",
    whyItMatters: "Human emergency shelters do not supply pet kibble. Having food prevents pet starvation and distress.",
    disasters: ["general", "flood", "cyclone", "fire"],
    subPersonalCategory: "pets"
  },
  {
    id: "personal_pet_leash_carrier",
    name: "Sturdy Leash, Harness & ID Tag",
    category: "personal",
    categoryLabel: "Personal Needs",
    priority: "CRITICAL",
    approxWeightKg: 0.25,
    description: "Secure nylon leash and harness with microchip info tag or vaccination slip.",
    whyItMatters: "Terrified pets bolt when sirens roar or ground shakes. Shelters require pets to be restrained or in carriers.",
    disasters: ["general", "fire", "earthquake", "flood"],
    subPersonalCategory: "pets"
  }
];

export const DISASTER_PRESETS: {
  id: DisasterType;
  title: string;
  badge: string;
  iconName: string;
  summary: string;
  keyAdvice: string;
  recommendedFocus: string[];
}[] = [
  {
    id: "general",
    title: "All-Hazards Universal Pack",
    badge: "Balanced 72h",
    iconName: "Briefcase",
    summary: "A versatile baseline kit suited for unexpected infrastructure collapse, evacuation, or home isolation.",
    keyAdvice: "Keep portable (target 6–9 kg). Don't pack bulky luxury items that slow you down.",
    recommendedFocus: ["water", "food", "first_aid", "lighting", "communication", "power", "documents"]
  },
  {
    id: "earthquake",
    title: "Earthquake Evacuation Pack",
    badge: "Debris & Aftershocks",
    iconName: "Activity",
    summary: "Built for escaping cracked structures, aftershocks, severed utilities, and glass debris.",
    keyAdvice: "Prioritize sturdy footwear, dust protection (respirators), loud pea-less whistles, and emergency headlamps.",
    recommendedFocus: ["first_aid", "lighting", "communication", "clothing", "tools", "water"]
  },
  {
    id: "flood",
    title: "Flood & Coastal Inundation Pack",
    badge: "Waterborne Hazards",
    iconName: "Waves",
    summary: "Tailored for rising waters, submerged roads, contaminated tap water, and hypothermia.",
    keyAdvice: "Double-bag all electronics and documents in waterproof pouches. Emphasize water purification and rain protection.",
    recommendedFocus: ["water", "weather", "documents", "hygiene", "communication"]
  },
  {
    id: "fire",
    title: "Wildfire & Building Evacuation",
    badge: "Rapid Escape",
    iconName: "Flame",
    summary: "Focuses on rapid 3-minute vehicle/foot evacuation before smoke and flames cut off routes.",
    keyAdvice: "Official evacuation orders ALWAYS take priority over collecting items. Grab only pre-staged essentials.",
    recommendedFocus: ["documents", "first_aid", "power", "lighting", "water"]
  },
  {
    id: "cyclone",
    title: "Cyclone & Severe Storm Pack",
    badge: "High Wind & Rain",
    iconName: "Wind",
    summary: "Engineered for torrential rain, flying roof debris, downed powerlines, and prolonged blackouts.",
    keyAdvice: "Have heavy-duty rain ponchos, emergency hand-crank radios, and power banks charged in advance.",
    recommendedFocus: ["weather", "communication", "power", "lighting", "food"]
  },
  {
    id: "blackout",
    title: "Major Power & Grid Outage",
    badge: "Off-Grid Survival",
    iconName: "ZapOff",
    summary: "Designed for prolonged grid collapse, dark cold nights, dead cell towers, and offline payment systems.",
    keyAdvice: "Have physical small cash, multiple reliable light sources, and ready-to-eat foods that require zero cooking.",
    recommendedFocus: ["lighting", "power", "food", "documents", "communication"]
  }
];
