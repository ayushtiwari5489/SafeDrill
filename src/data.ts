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
    title: "CPR & Basic Life Support",
    category: "First Aid",
    estimatedMinutes: 5,
    badge: "Life Saver",
    summary: "Learn life-saving 100-120 BPM chest compressions that preserve brain viability during sudden cardiac arrest, plus AED deployment.",
    interactiveType: "cpr-metronome",
    videos: [
      {
        id: "cpr-vid-1",
        title: "Hands-Only CPR Instructional Video",
        organization: "American Heart Association",
        duration: "1:03",
        youtubeId: "M4ACYp75mjU",
        description: "Official American Heart Association guide on performing high-quality chest compressions at 100-120 beats per minute to double cardiac arrest survival rates.",
        keyTimestamps: [
          { time: "0:12", seconds: 12, label: "Check Responsiveness & Breathing" },
          { time: "0:25", seconds: 25, label: "Call 911 / 112 for Emergency Help" },
          { time: "0:35", seconds: 35, label: "Center of Chest Hand Placement" },
          { time: "0:45", seconds: 45, label: "Push Hard & Fast (100-120 BPM)" }
        ],
        level: "Essential",
        instructorTip: "Position your shoulders directly above your hands and lock your elbows straight. Use your upper body weight to drive compressions at least 2 inches deep.",
        learningObjectives: [
          "Recognize sudden cardiac arrest in under 10 seconds",
          "Deliver 100 to 120 beats/minute chest compressions",
          "Allow full chest recoil between every push without lifting hands"
        ]
      },
      {
        id: "cpr-vid-2",
        title: "Hands-Only CPR with an AED",
        organization: "American Heart Association",
        duration: "1:48",
        youtubeId: "M7I3mJTy4RI",
        description: "Official American Heart Association guide showing how to combine continuous Hands-Only CPR compressions with an Automated External Defibrillator (AED).",
        keyTimestamps: [
          { time: "0:15", seconds: 15, label: "Turn On AED & Follow Spoken Prompts" },
          { time: "0:35", seconds: 35, label: "Attach Electrode Pads to Bare Chest" },
          { time: "1:00", seconds: 60, label: "Clear Patient for Heart Rhythm Analysis" },
          { time: "1:20", seconds: 80, label: "Deliver Shock & Resume Compressions Immediately" }
        ],
        level: "Comprehensive",
        instructorTip: "Never peel off the AED electrode pads once applied. If the AED advises a shock, shout 'STAND CLEAR!' loudly and ensure no one is touching the patient.",
        learningObjectives: [
          "Power on and follow clear AED voice instructions",
          "Affix adhesive pads: upper right chest and lower left ribs",
          "Resume CPR compressions instantly after defibrillation shock"
        ]
      },
      {
        id: "cpr-vid-3",
        title: "Learn Hands-Only CPR in 90 Seconds",
        organization: "American Heart Association",
        duration: "1:32",
        youtubeId: "hblmFtbyYKQ",
        description: "Concise summary from the American Heart Association showing real-world bystander intervention and why immediate compressions save lives.",
        keyTimestamps: [
          { time: "0:10", seconds: 10, label: "Why Bystander CPR is Crucial" },
          { time: "0:30", seconds: 30, label: "Two Steps: Call 911 & Push Center of Chest" },
          { time: "1:00", seconds: 60, label: "Staying Alive Tempo Practice" }
        ],
        level: "Essential",
        instructorTip: "Don't be afraid to push hard. Any CPR is better than no CPR. Ribs may crack or click, which is common; keep pushing to circulate oxygenated blood to the brain.",
        learningObjectives: [
          "Overcome hesitation when a victim collapses",
          "Maintain rhythm to Bee Gees' Stayin' Alive (100-120 BPM)",
          "Continue until professional emergency medics take over"
        ]
      }
    ],
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
        description: "Ensure the surroundings are safe. Tap the victim firmly on the collarbones and shout: 'Are you OK?'",
        actionCallout: "If no response and no normal breathing, immediately initiate Cardiac Arrest Protocol.",
        iconName: "UserCheck",
        caution: "Agonal gasping is NOT normal breathing. Treat it as cardiac arrest immediately."
      },
      {
        stepNumber: 2,
        title: "Call Emergency Dispatch & Delegate AED",
        description: "Point directly at a bystander: 'Call 112 (or 911) now and bring an AED!'",
        actionCallout: "Put the dispatcher on speakerphone so you can follow real-time medical instructions.",
        iconName: "PhoneCall"
      },
      {
        stepNumber: 3,
        title: "Hand Placement on Center of Chest",
        description: "Place heel of one hand in the center of the chest. Interlock your other hand on top. Lock your elbows straight and position shoulders directly above hands.",
        actionCallout: "Use upper body weight, not just arms, to drive compressions.",
        iconName: "HeartHandshake"
      },
      {
        stepNumber: 4,
        title: "Push Hard & Fast (100–120 BPM)",
        description: "Compress chest at least 2 inches deep at 100-120 BPM until emergency medics arrive or AED analyzes.",
        actionCallout: "Allow chest to recoil fully between compressions.",
        iconName: "Activity"
      }
    ]
  },
  {
    id: "fire-extinguisher-pass",
    title: "Fire Extinguisher & Fire Safety",
    category: "Fire Safety",
    estimatedMinutes: 4,
    badge: "Fire Guardian",
    summary: "Master the international 4-step P.A.S.S. protocol to safely control incipient-stage fires and know when to evacuate.",
    interactiveType: "fire-pass-sim",
    videos: [
      {
        id: "fire-vid-1",
        title: "How to Use a Fire Extinguisher Using the PASS Method",
        organization: "CQ Fire & Safety",
        duration: "2:04",
        youtubeId: "PQV71INDaqY",
        description: "Clear, practical demonstration of Pull, Aim, Squeeze, and Sweep against live flames with standard ABC dry chemical fire extinguishers.",
        keyTimestamps: [
          { time: "0:15", seconds: 15, label: "Extinguisher Inspection & Pressure Gauge Check" },
          { time: "0:40", seconds: 40, label: "P - Pull the Locking Pin" },
          { time: "1:00", seconds: 60, label: "A - Aim Low at the Base of the Flames" },
          { time: "1:25", seconds: 85, label: "S & S - Squeeze Handle & Sweep Base" }
        ],
        level: "Essential",
        instructorTip: "Keep your back to an unobstructed exit. Never let the fire get between you and your escape door. If smoke thickens or flames rise above waist level, evacuate immediately.",
        learningObjectives: [
          "Verify the pressure gauge needle is in the green zone",
          "Aim directly at burning fuel embers rather than smoke",
          "Sweep horizontally until all embers are fully smothered"
        ]
      },
      {
        id: "fire-vid-2",
        title: "How to Use a Fire Extinguisher: The PASS Method Demonstration",
        organization: "Ally Safety",
        duration: "3:12",
        youtubeId: "OhmiECKjYx8",
        description: "Workplace safety specialist demonstration explaining chemical agent discharge distance, wind direction, and common mistakes.",
        keyTimestamps: [
          { time: "0:30", seconds: 30, label: "Stand 6-8 Feet Back From Fire" },
          { time: "1:15", seconds: 75, label: "Unlocking Safety Pin without Squeezing Lever" },
          { time: "1:50", seconds: 110, label: "Sweeping Across Fire Base Effectively" },
          { time: "2:35", seconds: 155, label: "Backing Away Carefully - Never Turn Your Back" }
        ],
        level: "Essential",
        instructorTip: "Hold the lower carrying handle when pulling the pin. If you squeeze the upper trigger lever while trying to pull the pin, the locking pin will bind tightly.",
        learningObjectives: [
          "Maintain proper 6 to 8 feet stand-off distance",
          "Proper two-handed grip on nozzle and carry handle",
          "Always back away while keeping eyes on the fire"
        ]
      },
      {
        id: "fire-vid-3",
        title: "How to Use a Fire Extinguisher - PASS Method",
        organization: "Cintas",
        duration: "1:52",
        youtubeId: "heVKavoFhKA",
        description: "Commercial and home fire emergency response protocol: assessing fire scale, escape route clearance, and discharge control.",
        keyTimestamps: [
          { time: "0:10", seconds: 10, label: "Sound Alarm & Confirm Evacuation Route" },
          { time: "0:35", seconds: 35, label: "Pull Pin & Break Plastic Tamper Seal" },
          { time: "0:55", seconds: 55, label: "Aim Low & Squeeze Lever Controlled" },
          { time: "1:20", seconds: 80, label: "Sweep Base & Watch for Re-flash" }
        ],
        level: "Essential",
        instructorTip: "Remember that portable fire extinguishers only discharge for approximately 10 to 15 seconds. Make every second count by aiming before squeezing.",
        learningObjectives: [
          "Evaluate if fire is in the incipient (small) stage",
          "Deliver steady, controlled chemical sweeps",
          "Confirm complete extinguishment without flashover"
        ]
      }
    ],
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
        description: "Break the tamper plastic seal and pull the ring pin located at the top handle.",
        actionCallout: "Hold the lower carrying handle, not the trigger lever while pulling.",
        iconName: "LockOpen"
      },
      {
        stepNumber: 2,
        title: "A - Aim Low at the Base of the Fire",
        description: "Aim nozzle directly at the fuel source or base of the fire, not the top flames.",
        actionCallout: "Stand 6 to 8 feet away from the flames before discharging.",
        iconName: "Target",
        caution: "Do not stand too close; high-pressure chemical blast can scatter burning debris."
      },
      {
        stepNumber: 3,
        title: "S - Squeeze the Operating Lever",
        description: "Squeeze top trigger handle smoothly and steadily to release extinguishing agent.",
        actionCallout: "Releasing the handle stops the flow.",
        iconName: "Zap"
      },
      {
        stepNumber: 4,
        title: "S - Sweep Side-to-Side Across the Base",
        description: "Move nozzle side to side across fire base until all flames are completely extinguished.",
        actionCallout: "If fire doesn't diminish within 5 seconds, retreat immediately.",
        iconName: "Flame"
      }
    ]
  },
  {
    id: "bleeding-control",
    title: "Severe Bleeding & First Aid",
    category: "First Aid",
    estimatedMinutes: 5,
    badge: "Trauma Medic",
    summary: "Stop catastrophic arterial blood loss in under 60 seconds with direct pressure, wound packing, and modern tactical tourniquets.",
    videos: [
      {
        id: "bleed-vid-1",
        title: "How To STOP THE BLEED®",
        organization: "American College of Surgeons",
        duration: "4:18",
        youtubeId: "7LEqWoK_aS0",
        description: "The official American College of Surgeons STOP THE BLEED protocol: applying firm pressure, packing deep wounds, and locking a windlass tourniquet.",
        keyTimestamps: [
          { time: "0:30", seconds: 30, label: "Identify Life-Threatening Bleeding" },
          { time: "1:10", seconds: 70, label: "Direct Pressure with Two Hands & Bodyweight" },
          { time: "2:10", seconds: 130, label: "Wound Packing into Deep Cavity" },
          { time: "3:00", seconds: 180, label: "Tourniquet Placement & Windlass Tightening" }
        ],
        level: "Essential",
        instructorTip: "Uncontrolled bleeding can kill within 3 to 5 minutes. Take immediate action: call 911/112, apply firm pressure, and don't hesitate to deploy a tourniquet.",
        learningObjectives: [
          "Recognize spurting or pooling arterial hemorrhage",
          "Apply two-handed unrelenting bodyweight pressure",
          "Lock tourniquet windlass rod into the retention clip"
        ]
      },
      {
        id: "bleed-vid-2",
        title: "How to Use a Tourniquet to Control Life-Threatening Bleeding",
        organization: "American Red Cross",
        duration: "1:35",
        youtubeId: "k98ilfQmUWw",
        description: "Official American Red Cross step-by-step video on applying a commercial windlass tourniquet to an injured arm or leg.",
        keyTimestamps: [
          { time: "0:15", seconds: 15, label: "Position 2 to 3 Inches Above Wound" },
          { time: "0:35", seconds: 35, label: "Pull Band Tight & Fasten Hook-and-Loop" },
          { time: "0:55", seconds: 55, label: "Twist Windlass Rod Until Bleeding Stops" },
          { time: "1:15", seconds: 75, label: "Secure in Clip & Record Time Applied" }
        ],
        level: "Essential",
        instructorTip: "Place the tourniquet 2 to 3 inches above the wound on the limb (closer to the heart). Do NOT place it over a joint (elbow or knee); place it higher if needed.",
        learningObjectives: [
          "Eliminate slack in the strap before twisting windlass",
          "Twist windlass until bright red bleeding completely stops",
          "Mark exact application time (T = HH:MM) on white strap"
        ]
      },
      {
        id: "bleed-vid-3",
        title: "How to Use Direct Pressure to Control Life-Threatening Bleeding",
        organization: "American Red Cross",
        duration: "1:21",
        youtubeId: "YJB3fI3T1oo",
        description: "Official American Red Cross instructions for using clean cloth or gauze with continuous direct pressure when no tourniquet is available.",
        keyTimestamps: [
          { time: "0:10", seconds: 10, label: "Call Emergency Dispatch Immediately" },
          { time: "0:30", seconds: 30, label: "Expose Wound & Place Gauze / Clean Cloth" },
          { time: "0:50", seconds: 50, label: "Lock Arms Straight & Push Down With Bodyweight" },
          { time: "1:05", seconds: 65, label: "Never Remove Blood-Soaked Gauze - Add More on Top" }
        ],
        level: "Essential",
        instructorTip: "If blood soaks through your dressing, do NOT remove the first layer (you will disrupt blood clots). Place additional dressings directly on top and press harder.",
        learningObjectives: [
          "Maintain unbroken pressure until paramedics arrive",
          "Leverage upper body weight instead of finger muscles",
          "Calm and stabilize the trauma patient"
        ]
      },
      {
        id: "bleed-vid-4",
        title: "Stop-the-Bleed: How to Apply a Tourniquet to a Trauma Wound",
        organization: "UCI Health",
        duration: "2:46",
        youtubeId: "qxH_NzFUwpM",
        description: "UCI Health trauma nurse demonstration showing real-time application of the Combat Application Tourniquet (C-A-T) on an injured extremity.",
        keyTimestamps: [
          { time: "0:25", seconds: 25, label: "Slide Tourniquet High and Tight on Limb" },
          { time: "1:00", seconds: 60, label: "Pull Strap Completely Free of Slack" },
          { time: "1:40", seconds: 100, label: "Turn Windlass 2 to 3 Rotations" },
          { time: "2:15", seconds: 135, label: "Verify Absence of Distal Radial/Pedal Pulse" }
        ],
        level: "Essential",
        instructorTip: "Tourniquet application will be painful for a conscious victim. Explain to them that it is saving their life and must stay tight until surgeons take over.",
        learningObjectives: [
          "Master tourniquet threading without slack",
          "Verify that distal pulse is completely occluded",
          "Secure the time strap across the windlass clip"
        ]
      }
    ],
    keyTakeaways: [
      "A person can bleed to death from an open artery in less than 3 minutes.",
      "Apply firm, uninterrupted bodyweight pressure with clean cloth or sterile gauze.",
      "Apply a tourniquet 2 to 3 inches above the wound (never directly over a joint).",
      "Tighten windlass until bright red bleeding completely stops and distal pulse vanishes."
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Expose Wound & Assess Bleeding",
        description: "Expose the wound to find the exact source of arterial bleeding.",
        actionCallout: "Call 112/911 immediately and shout for a trauma first aid kit.",
        iconName: "AlertTriangle"
      },
      {
        stepNumber: 2,
        title: "Apply Relentless Direct Pressure",
        description: "Press down directly on the bleeding vessel with locked elbows using all your upper body weight.",
        actionCallout: "Do not peek under the gauze to check—hold continuous pressure.",
        iconName: "Sparkles"
      },
      {
        stepNumber: 3,
        title: "Deploy Tourniquet (For Arms & Legs)",
        description: "Wrap tourniquet 2-3 inches above wound. Pull strap tight, twist windlass rod until bleeding stops, and lock in clip.",
        actionCallout: "Write the application time (e.g. 'T: 14:32') on the tourniquet strap.",
        iconName: "Shield"
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
