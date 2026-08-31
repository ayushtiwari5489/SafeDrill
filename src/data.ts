import { ScenarioQuestion, CourseModule, GoBagItem } from "./types";

export const SCENARIOS: ScenarioQuestion[] = [
  // SCHOOL & EARTHQUAKE SCENARIO
  {
    id: "school-eq-1",
    location: "school",
    locationName: "Classroom (2nd Floor)",
    disaster: "earthquake",
    disasterName: "Magnitude 6.8 Earthquake",
    dangerLevel: "CRITICAL",
    contextDescription: "You are seated in your science class when the floor violently trembles and ceiling tiles start rattling loudly!",
    situation: "The violent shaking starts right now. What is your immediate instinctual reaction?",
    urgencySeconds: 12,
    options: [
      {
        id: "A",
        text: "DROP under your sturdy desk, COVER your head & HOLD ON to the legs.",
        isCorrect: true,
        consequence: "You safely shielded your vital organs and head from falling glass shards and lighting fixtures!",
        survivalTip: "NDMA & Sendai Framework Golden Rule: 'Drop, Cover, Hold On'. Over 58.6% of India's landmass is vulnerable to moderate to severe earthquakes (Zones III to V)."
      },
      {
        id: "B",
        text: "Panic and sprint immediately toward the crowded hallway staircase.",
        isCorrect: false,
        consequence: "You tripped in the stairwell jam while falling ceiling plaster injured people rushing downstairs.",
        survivalTip: "NEVER run during active shaking. Ministry of Home Affairs (MHA) disaster guidelines state that running during tremors causes 55%+ of non-fatal crush injuries."
      }
    ],
    didYouKnow: "According to the Vulnerability Atlas of India (BMTPC & NDMA), nearly 59% of India is prone to earthquakes, yet 85%+ of schools have never conducted a timed Drop-Cover-Hold drill."
  },
  {
    id: "school-eq-2",
    location: "school",
    locationName: "School Corridor & Staircase",
    disaster: "earthquake",
    disasterName: "Post-Quake Evacuation",
    dangerLevel: "HIGH",
    contextDescription: "The initial 40-second shaking has stopped. The teacher orders an orderly building evacuation to the open playground.",
    situation: "As you exit the room, you notice a student heading toward the building elevator to get down faster.",
    urgencySeconds: 10,
    options: [
      {
        id: "A",
        text: "Stop them immediately and direct everyone down the exterior emergency stairs.",
        isCorrect: true,
        consequence: "You prevented a fatal entrapment! Power cut out 30 seconds later, leaving the elevator stalled between floors.",
        survivalTip: "Never use elevators during earthquakes or fires. Power cables can snap or fail, trapping occupants inside smoke or aftershocks."
      },
      {
        id: "B",
        text: "Join them in the elevator so your group can reach ground level quicker.",
        isCorrect: false,
        consequence: "The elevator lost primary power midway down and got stuck with smoke seeping into the shaft.",
        survivalTip: "Always use stairs with handrails during seismic evacuations. Protect the back of your neck with a backpack or hands."
      }
    ],
    didYouKnow: "Aftershocks can strike within minutes of the main tremor, causing secondary damage to elevator shafts."
  },
  {
    id: "school-eq-3",
    location: "school",
    locationName: "School Playground (Evacuation Zone)",
    disaster: "earthquake",
    disasterName: "Open Field Safety",
    dangerLevel: "MODERATE",
    contextDescription: "You reach the school field. You see a large gathering near the perimeter wall underneath overhead electrical power lines.",
    situation: "Where should you position yourself on the open ground?",
    urgencySeconds: 12,
    options: [
      {
        id: "A",
        text: "Move to the center of the field, far away from utility poles, tall trees & perimeter walls.",
        isCorrect: true,
        consequence: "Great positioning! Minutes later, an aftershock caused a concrete boundary wall section to crumble safely away from you.",
        survivalTip: "Exterior building walls, glass facades, and high-voltage power lines are the most hazardous collapse vectors."
      },
      {
        id: "B",
        text: "Huddle right under the shade of the tall perimeter brick wall for comfort.",
        isCorrect: false,
        consequence: "The weakened brick wall developed severe shear cracks and partially toppled during the aftershock.",
        survivalTip: "Keep a distance of at least 1.5 times the height of adjacent buildings or walls in an assembly area."
      }
    ],
    didYouKnow: "Unreinforced brick walls are among the most vulnerable structural elements during earthquakes."
  },

  // HIGHRISE APARTMENT & FIRE SCENARIO
  {
    id: "highrise-fire-1",
    location: "highrise",
    locationName: "High-Rise Apartment (14th Floor)",
    disaster: "fire",
    disasterName: "Midnight High-Rise Fire",
    dangerLevel: "CRITICAL",
    contextDescription: "The smoke detector blares at 2:00 AM. Acrid black smoke is visibly curling under your apartment entrance door!",
    situation: "Before opening your apartment front door to escape, what must you do first?",
    urgencySeconds: 10,
    options: [
      {
        id: "A",
        text: "Touch the door & metal knob with the BACK of your hand to test for heat.",
        isCorrect: true,
        consequence: "The door is scorching hot! Testing with the back of your hand protected your palm from burning while revealing fire right outside.",
        survivalTip: "If the door is warm/hot, NEVER open it. Fire is roaring outside. Seal door gaps with wet towels and retreat to a balcony or window."
      },
      {
        id: "B",
        text: "Kick open the door immediately and sprint out into the dark hallway.",
        isCorrect: false,
        consequence: "Opening the door fed fresh oxygen into a flashover fireball that swept directly into the apartment.",
        survivalTip: "A backdraft/flashover can occur when oxygen suddenly enters a heated room. Always check temperature first."
      }
    ],
    didYouKnow: "Toxic smoke inhalation causes over 70% of fire-related deaths, not the flames themselves."
  },
  {
    id: "highrise-fire-2",
    location: "highrise",
    locationName: "Smoky Hallway Escape",
    disaster: "fire",
    disasterName: "Smoke Navigation",
    dangerLevel: "HIGH",
    contextDescription: "The door is cool, but when cracked open slightly, dense grey smoke is filling the upper half of the corridor.",
    situation: "How do you navigate through the corridor toward the emergency exit stairs?",
    urgencySeconds: 10,
    options: [
      {
        id: "A",
        text: "Crawl on your hands and knees, keeping your mouth and nose low to the floor.",
        isCorrect: true,
        consequence: "You breathed cooler, cleaner air near the bottom 12 inches of the floor and exited safely!",
        survivalTip: "Superheated toxic smoke and carbon monoxide rise toward the ceiling. The cleanest breathable air layer is within 1-2 feet of the floor."
      },
      {
        id: "B",
        text: "Stand upright and take deep breaths while running fast through the smoke cloud.",
        isCorrect: false,
        consequence: "Inhaling superheated 300°C smoke scorched respiratory airways and caused disorientation within 3 breaths.",
        survivalTip: "Cover your nose with a damp cloth if available and crawl along the baseboards to maintain direction."
      }
    ],
    didYouKnow: "Just 2 to 3 breaths of toxic carbon monoxide and hydrogen cyanide in dense smoke can render a person unconscious."
  },

  // METRO STATION & STAMPEDE / POWER OUTAGE
  {
    id: "metro-stampede-1",
    location: "metro",
    locationName: "Underground Metro Platform",
    disaster: "stampede",
    disasterName: "Power Outage & Crowd Surge",
    dangerLevel: "HIGH",
    contextDescription: "During rush hour in a deep underground transit station, all main lights abruptly die and a panicked crowd begins pushing forward violently!",
    situation: "A heavy crowd surge presses tightly against you from all directions. How should you protect your chest and breathing?",
    urgencySeconds: 10,
    options: [
      {
        id: "A",
        text: "Adopt the 'Boxer Stance': Keep feet wide, hold arms bent firmly in front of your ribcage like a boxer shield.",
        isCorrect: true,
        consequence: "Your braced arms created a rigid breathing pocket, preventing chest compression asphyxiation!",
        survivalTip: "The boxer stance shields your lungs from compressive crowd forces that can exceed 1,000 lbs of pressure."
      },
      {
        id: "B",
        text: "Drop to your knees and try to crawl between people's legs to squeeze out.",
        isCorrect: false,
        consequence: "Falling in a moving crowd caused you to be trampled and pinned under the surge.",
        survivalTip: "NEVER fall or bend down to pick up dropped items in a surge. If someone falls, immediately shout and haul them up."
      }
    ],
    didYouKnow: "Crowd crush deaths are typically caused by compressive asphyxiation, not blunt physical trauma."
  },
  {
    id: "metro-stampede-2",
    location: "metro",
    locationName: "Metro Platform Edge",
    disaster: "stampede",
    disasterName: "Track Avoidance",
    dangerLevel: "CRITICAL",
    contextDescription: "The surge is moving toward the platform edge near the live 750V electrified third rail.",
    situation: "How do you direct your physical movement inside the moving surge?",
    urgencySeconds: 10,
    options: [
      {
        id: "A",
        text: "Move diagonally across the flow toward solid pillars or walls, moving with the rhythm rather than fighting directly head-on.",
        isCorrect: true,
        consequence: "You safely worked your way to the safety zone behind a reinforced support column.",
        survivalTip: "Don't fight a crowd directly backward (which expends oxygen). Edge diagonally outward toward peripheral pockets."
      },
      {
        id: "B",
        text: "Push directly backward with maximum force against thousands of people behind you.",
        isCorrect: false,
        consequence: "You rapidly exhausted your physical strength and lost your footing against the unstoppable human wave.",
        survivalTip: "Conserve stamina, avoid screaming to preserve oxygen, and navigate gently toward flow eddies."
      }
    ],
    didYouKnow: "Human crowd dynamics behave similarly to fluid shockwaves under high density (over 6 people per square meter)."
  },

  // HOME & FLASH FLOOD / GAS LEAK
  {
    id: "home-flood-1",
    location: "home",
    locationName: "Ground Floor Residence",
    disaster: "flood",
    disasterName: "Rapid Flash Flood",
    dangerLevel: "HIGH",
    contextDescription: "Torrential monsoon rains cause storm drains to overflow. Brown floodwater is entering your ground-floor living room fast.",
    situation: "Before heading to the upper floor or roof, what is your most critical immediate electrical safeguard?",
    urgencySeconds: 12,
    options: [
      {
        id: "A",
        text: "Switch OFF the main electrical breaker/fuse box ONLY if the panel is in a completely dry location.",
        isCorrect: true,
        consequence: "You prevented electrocution and structural electrical fires as water submerged the wall sockets!",
        survivalTip: "Never touch an electrical panel or switches while standing in water or if the box itself is damp."
      },
      {
        id: "B",
        text: "Wade through knee-deep water with bare feet to plug in a portable sump pump.",
        isCorrect: false,
        consequence: "Submerged live wiring energized the floodwater, causing severe electric shock.",
        survivalTip: "Water mixed with dissolved mud and salts is an extremely efficient electrical conductor."
      }
    ],
    didYouKnow: "Just 6 inches of moving water can knock down an adult, and 12 inches can sweep away a small vehicle."
  },
  {
    id: "home-gas-1",
    location: "home",
    locationName: "Kitchen",
    disaster: "chemical",
    disasterName: "LPG Cooking Gas Leak",
    dangerLevel: "CRITICAL",
    contextDescription: "You step into your kitchen and immediately smell a strong rotten-egg sulfur odor (Ethyl Mercaptan).",
    situation: "The room is dark. What must you NEVER do in this situation?",
    urgencySeconds: 10,
    options: [
      {
        id: "A",
        text: "DO NOT flip any light switches or appliances. Open all windows & shut off the cylinder regulator valve.",
        isCorrect: true,
        consequence: "You prevented a catastrophic gas vapor ignition! Natural ventilation dispersed the combustible gas safely.",
        survivalTip: "Even a microscopic electrical spark from flipping a standard wall switch or flashlight can trigger a full-room gas explosion."
      },
      {
        id: "B",
        text: "Turn ON the exhaust fan switch and light a match to inspect where the leak is hissing.",
        isCorrect: false,
        consequence: "The electrical arcing inside the exhaust switch sparked an instantaneous gas detonation.",
        survivalTip: "Never use phones, switches, or open flames near a gas leak. Evacuate immediately if smell is overpowering."
      }
    ],
    didYouKnow: "LPG is heavier than air and pools along the floor, making low-lying ignition sources particularly lethal."
  },

  // SHOPPING MALL & CHEMICAL / ACTIVE THREAT
  {
    id: "mall-fire-1",
    location: "mall",
    locationName: "Multi-Level Shopping Mall Atrium",
    disaster: "fire",
    disasterName: "Commercial Atrium Fire",
    dangerLevel: "HIGH",
    contextDescription: "An electrical short in a clothing department sparks a rapidly expanding fire. Thick smoke billows into the central skylight atrium.",
    situation: "Alarms ring. Shoppers are running toward the glass escalator. Which exit path do you choose?",
    urgencySeconds: 12,
    options: [
      {
        id: "A",
        text: "Follow the green illuminated Emergency Exit door signs leading to pressurized fire escape stairwells.",
        isCorrect: true,
        consequence: "The fire-rated stairwell was pressurized, keeping smoke completely out while you descended safely!",
        survivalTip: "Commercial fire exit stairwells have self-closing 2-hour fire doors designed to provide a smoke-free escape tunnel."
      },
      {
        id: "B",
        text: "Head toward the central moving escalator and revolving glass front doors.",
        isCorrect: false,
        consequence: "The escalators automatically stopped during alarm, creating a dangerous crush bottleneck at the landing.",
        survivalTip: "Avoid decorative glass escalators and elevators in fires; look for dedicated emergency exit door symbols."
      }
    ],
    didYouKnow: "Fire escape stairs in modern buildings have positive air pressure fans to blow smoke backward into the building."
  },

  // OUTDOORS & LIGHTNING / TSUNAMI
  {
    id: "outdoors-tsunami-1",
    location: "outdoors",
    locationName: "Coastal Beach & Promenade",
    disaster: "tsunami",
    disasterName: "Submarine Quake & Tsunami Warning",
    dangerLevel: "CRITICAL",
    contextDescription: "After a distant rumble, the ocean water at the beach suddenly recedes hundreds of meters, exposing stranded fish and sea floor.",
    situation: "People are excitedly walking out onto the exposed seabed to take photos. What is your immediate action?",
    urgencySeconds: 10,
    options: [
      {
        id: "A",
        text: "Sprint immediately inland and uphill toward high ground or a reinforced concrete building (3rd floor+).",
        isCorrect: true,
        consequence: "You reached high elevation just as the first massive 8-meter tsunami surge violently obliterated the coastline!",
        survivalTip: "A rapidly receding sea is nature's unmistakable warning that a tsunami wave train is seconds to minutes away."
      },
      {
        id: "B",
        text: "Walk onto the exposed sand to take selfie videos of the bizarre ocean retreat.",
        isCorrect: false,
        consequence: "The incoming surge wave traveled at over 50 km/h, making escape impossible once the wave crest was visible.",
        survivalTip: "Tsunamis travel faster than human sprinting speed. Never wait to see the wave before fleeing."
      }
    ],
    didYouKnow: "In the 2004 Indian Ocean tsunami, 10-year-old Tilly Smith saved over 100 tourists on Maikhao Beach because she recognized the bubbling receding sea from a geography class lesson."
  }
];

export const COURSES: CourseModule[] = [
  {
    id: "cpr-basics",
    title: "Hands-Only CPR & Cardiac Arrest Response",
    category: "First Aid",
    estimatedMinutes: 5,
    badge: "Life Saver",
    summary: "Learn the life-saving 100-120 BPM chest compression technique that doubles survival rates during sudden cardiac emergencies.",
    interactiveType: "cpr-metronome",
    keyTakeaways: [
      "Check responsiveness and shout for an AED + call 112/911.",
      "Push hard and fast in the center of the chest (2 to 2.4 inches deep).",
      "Maintain a 100 to 120 compressions/min rhythm (think 'Stayin' Alive').",
      "Allow full chest recoil between compressions without lifting hands."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Assess Scene Safety & Patient Responsiveness",
        description: "Ensure the surroundings are safe from traffic, electrical wires, or fire. Tap the victim firmly on the collarbones and shout loudly: 'Are you OK?'",
        actionCallout: "If no response and no normal breathing (only gasping), immediately initiate Cardiac Arrest Protocol.",
        iconName: "UserCheck",
        caution: "Agonal gasping is NOT normal breathing. Treat it as cardiac arrest immediately."
      },
      {
        stepNumber: 2,
        title: "Call Emergency Dispatch & Delegate AED",
        description: "Point directly at a specific person: 'You in the blue shirt, call 112 (or 911) now and find an AED (Automated External Defibrillator)!'",
        actionCallout: "Put the dispatcher on speakerphone so you can follow real-time medical instructions.",
        iconName: "PhoneCall",
        proTip: "Directing one specific person avoids the bystander effect where everyone assumes someone else called."
      },
      {
        stepNumber: 3,
        title: "Hand Placement on Center of Chest",
        description: "Place the heel of one hand in the center of the chest (lower half of breastbone). Interlock your other hand on top. Lock your elbows straight and position shoulders directly above hands.",
        actionCallout: "Use your upper body weight, not just arm strength, to drive vertical compressions.",
        iconName: "HeartHandshake"
      },
      {
        stepNumber: 4,
        title: "Push Hard & Push Fast (100–120 BPM)",
        description: "Compress the chest at least 2 inches (5 cm) deep at a cadence of 100-120 beats per minute. Do not stop until professional medics arrive or an AED is ready to analyze.",
        actionCallout: "Test your rhythm with the interactive SafeDrill Metronome tool below!",
        iconName: "Activity",
        proTip: "Sing the rhythm of 'Stayin' Alive' by Bee Gees or 'Baby Shark' in your head to hold the perfect 110 BPM rate."
      }
    ]
  },
  {
    id: "fire-extinguisher-pass",
    title: "Fire Extinguisher Mastery: The P.A.S.S. Technique",
    category: "Fire Safety",
    estimatedMinutes: 4,
    badge: "Fire Guardian",
    summary: "Master the international 4-step P.A.S.S. protocol to safely control incipient-stage fires and know when to evacuate.",
    interactiveType: "fire-pass-sim",
    keyTakeaways: [
      "Always maintain an unobstructed escape path behind your back.",
      "P.A.S.S. stands for Pull, Aim, Squeeze, Sweep.",
      "Aim strictly at the BASE of the flames, not the smoke or top fire.",
      "Most standard home/office extinguishers last only 10-15 seconds!"
    ],
    steps: [
      {
        stepNumber: 1,
        title: "P - Pull the Safety Pin",
        description: "Break the tamper plastic seal and pull the ring pin located at the top handle. This unlocks the discharge trigger mechanism.",
        actionCallout: "Firmly pull ring straight out. Hold the lower carrying handle, not the trigger lever while pulling.",
        iconName: "LockOpen"
      },
      {
        stepNumber: 2,
        title: "A - Aim Low at the Base of the Fire",
        description: "Hold the hose nozzle firmly and aim directly at the fuel source or base of the fire. Aiming at the high flames will waste extinguishing agent without smothering fuel.",
        actionCallout: "Stand approximately 6 to 8 feet (2 meters) away from the flames before discharging.",
        iconName: "Target",
        caution: "Do not stand too close; high-pressure chemical blast can scatter burning debris."
      },
      {
        stepNumber: 3,
        title: "S - Squeeze the Operating Lever",
        description: "Squeeze the top trigger handle smoothly and steadily to release the extinguishing agent (Dry Chemical ABC or CO2).",
        actionCallout: "Releasing the handle stops the flow.",
        iconName: "Zap"
      },
      {
        stepNumber: 4,
        title: "S - Sweep Side-to-Side Across the Base",
        description: "Move the nozzle slowly from side to side in a sweeping motion across the base of the fire until all flames are completely extinguished. Watch for re-ignition.",
        actionCallout: "If fire does not diminish within 5 seconds, retreat immediately through your exit.",
        iconName: "Flame",
        proTip: "Never turn your back on an extinguished fire—smoldering embers can reignite violently."
      }
    ]
  },
  {
    id: "choking-heimlich",
    title: "Choking Emergency & Heimlich Maneuver",
    category: "First Aid",
    estimatedMinutes: 4,
    badge: "Airway Hero",
    summary: "Recognize universal choking signs and perform abdominal thrusts to dislodge airway obstructions in seconds.",
    interactiveType: "heimlich-steps",
    keyTakeaways: [
      "Universal choking sign: hands clutching the throat with inability to speak or cough.",
      "Alternate 5 back blows between shoulder blades with 5 abdominal thrusts.",
      "Thrust inward and upward just above the navel.",
      "For pregnant or obese victims, use chest thrusts instead of abdominal thrusts."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Verify Severe Airway Obstruction",
        description: "Ask: 'Are you choking? Can you speak?' If the person can cough forcefully or speak, encourage them to cough. If silent or gasping with blue lips, intervene immediately.",
        actionCallout: "Send someone to call 112/911 right away.",
        iconName: "AlertTriangle"
      },
      {
        stepNumber: 2,
        title: "Give 5 Firm Back Blows",
        description: "Stand behind and slightly to one side. Support their upper chest with one hand and lean them forward. Deliver 5 sharp blows between shoulder blades with heel of your other hand.",
        actionCallout: "Check after each blow if object has cleared.",
        iconName: "Hand"
      },
      {
        stepNumber: 3,
        title: "Perform 5 Abdominal Thrusts (Heimlich)",
        description: "Stand behind victim. Wrap arms around waist. Make a fist with thumb side against the abdomen, just above the belly button. Grasp fist with other hand and thrust inward and upward rapidly.",
        actionCallout: "Think of an upward 'J' motion to create diaphragmatic air pressure pop.",
        iconName: "Sparkles",
        caution: "If victim loses consciousness, gently lower to floor and start CPR compressions."
      }
    ]
  },
  {
    id: "go-bag-mastery",
    title: "72-Hour Disaster Go-Bag Essentials",
    category: "Preparedness",
    estimatedMinutes: 3,
    badge: "Ready Master",
    summary: "Assemble a lightweight, life-sustaining survival kit ready to grab in under 10 seconds during sudden evacuations.",
    interactiveType: "go-bag-builder",
    keyTakeaways: [
      "Minimum 3-day supply (72 hours) of water: 1 gallon (3.8L) per person per day.",
      "Non-perishable high-calorie food bars, nuts, or MREs.",
      "Crucial waterproof document pouch (IDs, property papers, insurance, emergency cash).",
      "Power bank, hand-crank emergency radio, flashlight, and first aid kit."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Hydration & Nutrition Core",
        description: "Water is priority #1. Pack durable water pouches or purification tablets along with compact energy bars requiring no cooking.",
        actionCallout: "Rotate water and food supplies every 6-12 months.",
        iconName: "Droplets"
      },
      {
        stepNumber: 2,
        title: "Medical & Critical Prescriptions",
        description: "Include a 7-day reserve of essential daily medications, trauma tourniquet, sterile gauze, burn dressings, antiseptic, and N95 dust masks.",
        actionCallout: "Keep a written copy of medical histories and blood types.",
        iconName: "BriefcaseMed"
      },
      {
        stepNumber: 3,
        title: "Off-Grid Power & Communication",
        description: "Pack a 20,000mAh charged power bank, USB cables, hand-crank multi-band NOAA radio, high-lumen LED headlamp, and a pea-less emergency whistle (audible up to 1 mile).",
        actionCallout: "A whistle requires far less energy than screaming and penetrates rubble noise.",
        iconName: "Radio"
      }
    ]
  }
];

export const INITIAL_GO_BAG_ITEMS: GoBagItem[] = [
  { id: "gb-1", category: "Water & Food", name: "3L Potable Water Pouches", importance: "CRITICAL", description: "Essential survival hydration (min 1L/day bare minimum)", packed: true },
  { id: "gb-2", category: "Water & Food", name: "High-Calorie Energy Rations / Bars", importance: "HIGH", description: "Non-perishable, ready to eat without stove or hot water", packed: true },
  { id: "gb-3", category: "Water & Food", name: "Water Purification Tablets", importance: "RECOMMENDED", description: "Treats murky pond/floodwater for safe consumption", packed: false },
  
  { id: "gb-4", category: "First Aid & Meds", name: "Trauma First Aid Kit & Tourniquet", importance: "CRITICAL", description: "Stops arterial bleeding, bandages wounds and burns", packed: true },
  { id: "gb-5", category: "First Aid & Meds", name: "7-Day Personal Prescription Meds", importance: "CRITICAL", description: "Asthma inhalers, insulin, heart meds, BP tablets", packed: false },
  { id: "gb-6", category: "First Aid & Meds", name: "N95 Particulate Respirator Masks", importance: "HIGH", description: "Filters volcanic ash, post-quake rubble dust, and smoke", packed: true },

  { id: "gb-7", category: "Tools & Power", name: "Loud Survival Whistle (Pea-less)", importance: "CRITICAL", description: "Signals rescue teams under rubble without losing voice", packed: true },
  { id: "gb-8", category: "Tools & Power", name: "20,000mAh Power Bank & Cables", importance: "HIGH", description: "Keeps smartphone alive for emergency SOS beacons", packed: true },
  { id: "gb-9", category: "Tools & Power", name: "Multi-tool / Heavy Duty Pocket Knife", importance: "HIGH", description: "Cuts seatbelts, opens cans, strips wires", packed: false },
  { id: "gb-10", category: "Tools & Power", name: "LED Headlamp with extra batteries", importance: "HIGH", description: "Hands-free illumination in dark stairwells", packed: false },

  { id: "gb-11", category: "Documents & Cash", name: "Waterproof Pouch with IDs & Records", importance: "CRITICAL", description: "Passports, IDs, insurance policies, house deeds in ziplock", packed: false },
  { id: "gb-12", category: "Documents & Cash", name: "Emergency Small Cash (Small bills)", importance: "HIGH", description: "ATMs fail during blackouts; digital UPI payments won't work", packed: false },

  { id: "gb-13", category: "Sanitation & Warmth", name: "Mylar Thermal Space Blanket", importance: "HIGH", description: "Reflects 90% body heat, prevents hypothermia and shock", packed: true },
  { id: "gb-14", category: "Sanitation & Warmth", name: "Heavy Duty Work Gloves", importance: "HIGH", description: "Protects hands from jagged broken glass and metal debris", packed: false },
];
