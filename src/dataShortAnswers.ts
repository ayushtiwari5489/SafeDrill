import { ShortAnswerScenario } from "./types";

export const SHORT_ANSWER_SCENARIOS: ShortAnswerScenario[] = [
  // 1. EARTHQUAKE - CLASSROOM (Decision, Age 8-10 / 11-14)
  {
    id: "eq-class-1",
    category: "earthquake",
    categoryLabel: "Earthquake Safety",
    ageGroup: "8-10",
    ageLabel: "Level 1: Beginner (8–10 yrs)",
    difficulty: 1,
    environment: "Classroom (2nd Floor)",
    scenario: "You are sitting in your classroom during an afternoon lesson when the floor suddenly begins shaking violently. Books start rattling on the shelves and another student panics and begins rushing toward the door.",
    question: "In 1–2 sentences, what should you immediately do while the shaking is happening?",
    questionType: "decision",
    expectedConcepts: [
      "Drop down to the floor",
      "Cover your head and neck",
      "Take cover under a sturdy desk or table",
      "Hold on to the desk legs",
      "Do NOT run toward the exit during active shaking"
    ],
    sampleGoodAnswer: "I would immediately Drop under my desk, Cover my head and neck with my arms, and Hold on to the table legs until the shaking stops, rather than running to the door.",
    betterOptions: [
      "Drop, Cover, and Hold On under a sturdy desk or table immediately.",
      "Protect your head and neck with your backpack or arms if no desk is nearby.",
      "Stay away from glass windows, heavy cabinets, and hanging ceiling lights.",
      "Wait patiently in place until the teacher gives the signal that shaking has ceased."
    ],
    safetyPrinciple: "RECOGNIZE → PROTECT: During active ground shaking, falling ceiling tiles, lights, and glass cause the vast majority of injuries. Never attempt to run outside while tremors are underway.",
    didYouKnow: "Studies by disaster agencies show that trying to run during shaking causes over 55% of all non-fatal earthquake injuries.",
    followUpPrompt: "The shaking has finally stopped and the teacher gives the evacuation order. What should you do with your belongings?"
  },

  // 2. EARTHQUAKE - EXPLANATION (Age 11-14)
  {
    id: "eq-window-2",
    category: "earthquake",
    categoryLabel: "Earthquake Safety",
    ageGroup: "11-14",
    ageLabel: "Level 2: Intermediate (11–14 yrs)",
    difficulty: 2,
    environment: "School Library / Reading Hall",
    scenario: "During an earthquake drill, some students wonder why the teacher strictly ordered everyone away from large exterior windows and glass display cases.",
    question: "Why should you always avoid running toward windows and glass panels during an earthquake?",
    questionType: "explanation",
    expectedConcepts: [
      "Glass shatters easily during seismic tremors",
      "Flying glass shards can cause severe cuts and injuries",
      "Window frames deform and pop out under pressure",
      "Exterior walls have higher risk of collapse"
    ],
    sampleGoodAnswer: "You must avoid windows because earthquake vibrations warp window frames, causing glass panes to shatter inward with high velocity, which can cause severe lacerations.",
    betterOptions: [
      "Move inward toward interior load-bearing columns or sturdy furniture.",
      "Turn your face away from glass and protect your eyes and neck with your arms.",
      "Crouch low against an interior wall if no desk is available."
    ],
    safetyPrinciple: "Shattered glass travels like sharp projectiles during earthquakes. Interior structural points provide much higher survivability.",
    didYouKnow: "Laminated or safety-filmed windows in modern buildings reduce injuries, but staying at least 2 meters away from glass remains universal protocol."
  },

  // 3. FIRE - SMOKE IN CORRIDOR (Decision & Movement, Age 8-10 / 11-14)
  {
    id: "fire-smoke-1",
    category: "fire",
    categoryLabel: "Fire & Smoke Safety",
    ageGroup: "8-10",
    ageLabel: "Level 1: Beginner (8–10 yrs)",
    difficulty: 2,
    environment: "School Corridor / Hallway",
    scenario: "The school fire alarm starts blaring with a loud continuous tone. As your class steps into the main corridor, you notice a layer of grey smoke drifting along the ceiling.",
    question: "How should you position your body and move while evacuating through a smoky hallway?",
    questionType: "decision",
    expectedConcepts: [
      "Crawl low or stay below the smoke layer",
      "Cover mouth and nose with a cloth or shirt",
      "Move steadily without pushing or stampeding",
      "Follow marked exit signs and teacher instructions"
    ],
    sampleGoodAnswer: "I would drop down and crawl low on my hands and knees under the smoke where the air is cleaner, covering my nose and mouth with a damp cloth or collar, and follow the teacher to the exit.",
    betterOptions: [
      "Drop to your knees and crawl beneath the smoke layer (the lowest 30 cm has the most oxygen).",
      "Cover your nose and mouth with a cloth, sleeve, or handkerchief to filter toxic particulates.",
      "Feel closed doors with the back of your hand before opening to check for heat.",
      "Never run upright or inhale deeply in smoke."
    ],
    safetyPrinciple: "Smoke inhalation is the primary cause of fatalities in building fires. Heated toxic gases rise, leaving breathable, cooler air near the floor.",
    didYouKnow: "Superheated smoke can reach over 300°C within minutes. Staying low can be the difference between safe evacuation and suffocation.",
    followUpPrompt: "You reach the exit door but the handle feels burning hot. What should you do instead of opening it?"
  },

  // 4. BUILDING EVACUATION - BACKPACK DILEMMA (Decision, Age 8-10)
  {
    id: "evac-bag-1",
    category: "evacuation",
    categoryLabel: "Building Evacuation",
    ageGroup: "8-10",
    ageLabel: "Level 1: Beginner (8–10 yrs)",
    difficulty: 1,
    environment: "School Assembly Point (Open Playground)",
    scenario: "You have just evacuated your classroom after a fire alarm and successfully reached the open football ground assembly area. Suddenly you remember that your bag, house keys, and phone are still inside your classroom desk.",
    question: "Should you run back inside the building to grab your belongings? What should you do instead?",
    questionType: "decision",
    expectedConcepts: [
      "Never return into an evacuated building",
      "Belongings can be replaced, life cannot",
      "Stay at the designated assembly point",
      "Inform the teacher or responsible adult about the missing items"
    ],
    sampleGoodAnswer: "No, I must never go back inside a burning or evacuated building. I should stay at the assembly point with my classmates and tell my teacher.",
    betterOptions: [
      "Remain calmly in line at your class's assigned assembly spot for head-count roll call.",
      "Tell your class teacher or safety warden if you have important medical items left behind.",
      "Keep the school entrance completely unobstructed for incoming fire engines and ambulances."
    ],
    safetyPrinciple: "NEVER RE-ENTER: Once out, stay out! Re-entering an emergency zone endangers yourself and forces emergency responders to risk their lives searching for you.",
    didYouKnow: "Many casualties in building emergencies occur when people return inside for pets, phones, or wallets."
  },

  // 5. FLOOD & WATER - ROAD HAZARDS (Decision, Age 11-14)
  {
    id: "flood-water-1",
    category: "flood",
    categoryLabel: "Flood & Water Hazards",
    ageGroup: "11-14",
    ageLabel: "Level 2: Intermediate (11–14 yrs)",
    difficulty: 2,
    environment: "Road Outside School Gate",
    scenario: "After continuous torrential monsoon rains, murky muddy water has flooded the street outside the school up to shin height. Some older students dare each other to wade through the water to reach a nearby bus stand.",
    question: "In 1–2 sentences, explain why walking through moving floodwater is dangerous and what is the safest action.",
    questionType: "decision",
    expectedConcepts: [
      "Do not enter floodwater",
      "Water hides open manholes, sharp debris, or downed live power cables",
      "Moving water has strong hidden current that can sweep people off their feet",
      "Stay in the high, safe location and wait for school authorities or parents"
    ],
    sampleGoodAnswer: "Walking in floodwater is very dangerous because just 15 cm of moving water can knock you down, and it conceals missing manhole covers and live electrical wires. The safest action is to stay on high ground at school.",
    betterOptions: [
      "Turn Around, Don't Drown: Never walk, wade, or swim in floodwater.",
      "Stay in multi-storey school buildings above ground floor until authorized rescue arrives.",
      "Watch out for fallen power lines that can electrify standing water over 50 meters away.",
      "Drink only bottled or sealed water; floodwaters carry hazardous raw sewage and contaminants."
    ],
    safetyPrinciple: "'TURN AROUND, DON'T DROWN' — You cannot see the depth, structural damage, open drain pits, or underwater hazards beneath muddy floodwaters.",
    didYouKnow: "Just 15 cm (6 inches) of rushing floodwater can knock an adult down, and 30 cm (1 foot) can float a passenger car."
  },

  // 6. EMERGENCY COMMUNICATION - REPORTING HAZARD (Communication, Age 11-14 / 15-17)
  {
    id: "comm-report-1",
    category: "communication",
    categoryLabel: "Emergency Communication",
    ageGroup: "11-14",
    ageLabel: "Level 2: Intermediate (11–14 yrs)",
    difficulty: 3,
    environment: "School Chemistry Lab Corridor",
    scenario: "You are walking down the corridor near the science wing and notice yellow acrid smoke and sparking sounds coming from an unattended electrical panel box.",
    question: "What specific, vital details must you communicate immediately to the nearest teacher or safety officer?",
    questionType: "communication",
    expectedConcepts: [
      "Exact location (e.g. science wing, 1st floor near Chemistry lab)",
      "Type of hazard (electrical sparking and acrid yellow smoke)",
      "Whether anyone is trapped or injured inside",
      "Do not attempt to touch or open the panel yourself"
    ],
    sampleGoodAnswer: "I would tell the teacher: 'There is sparking and acrid smoke from the electrical panel next to Chemistry Lab 2 on the first floor. No one is injured yet, and students need to stay clear of that corridor.'",
    betterOptions: [
      "State: 1) EXACT LOCATION (Room number / floor), 2) WHAT IS HAPPENING (smoke, sparks, flames), 3) WHO IS NEARBY.",
      "Speak calmly and clearly without screaming or exaggerating.",
      "Let the teacher or staff pull the official fire pull station alarm.",
      "Follow instructions to redirect classmates away from the corridor."
    ],
    safetyPrinciple: "Clear, concise communication (Where, What, Who) enables emergency teams to dispatch the correct extinguisher type (CO2/Dry Powder for electrical) before spreading.",
    didYouKnow: "Pouring water on an electrical fire causes electrocution. Identifying it as 'electrical' saves responders from making this fatal error."
  },

  // 7. LIGHTNING & THUNDERSTORM (Decision, Age 8-10 / 11-14)
  {
    id: "lightning-field-1",
    category: "lightning",
    categoryLabel: "Lightning & Storm Safety",
    ageGroup: "8-10",
    ageLabel: "Level 1: Beginner (8–10 yrs)",
    difficulty: 2,
    environment: "Open Sports Field",
    scenario: "You are playing football on the school field when you hear a sudden boom of thunder and see dark clouds flashing with lightning in the near distance. A friend suggests sheltering under a tall solitary banyan tree at the field edge.",
    question: "Should you shelter under the lone tree? What is the correct 30/30 safety procedure?",
    questionType: "decision",
    expectedConcepts: [
      "Never shelter under isolated or tall trees",
      "Move immediately indoors into a substantial building",
      "When thunder roars, go indoors",
      "Wait at least 30 minutes after the last thunderclap before resuming outdoor play"
    ],
    sampleGoodAnswer: "No, never shelter under a lone tree because lightning strikes the tallest point and travels down. You should immediately run inside a solid building and wait 30 minutes after thunder stops.",
    betterOptions: [
      "Remember the golden rule: 'When Thunder Roars, Go Indoors!'.",
      "Seek shelter in a fully enclosed building with wiring and plumbing (which grounds lightning).",
      "If caught in an open field with no shelter, crouch low on the balls of your feet with feet together (minimizing contact), but never lie flat.",
      "Stay away from metal goalposts, fences, and standing water."
    ],
    safetyPrinciple: "Tall solitary objects act as natural lightning rods. Ground current from a struck tree dissipates outward through the earth, electrocuting anything standing nearby.",
    didYouKnow: "Lightning bolts can strike up to 15 kilometers ahead of a storm cloud in clear blue skies ('a bolt from the blue')."
  },

  // 8. EXTREME HEAT & DEHYDRATION (Recall & Decision, Age 11-14)
  {
    id: "heat-sports-1",
    category: "heat",
    categoryLabel: "Extreme Heatwaves",
    ageGroup: "11-14",
    ageLabel: "Level 2: Intermediate (11–14 yrs)",
    difficulty: 2,
    environment: "School Ground on a 42°C Afternoon",
    scenario: "During physical education on an extremely hot summer afternoon, your classmate stops running, complains of intense headache and dizziness, and their skin is flushed, hot, and dry.",
    question: "Name three immediate first-aid steps you should take to help them before the medical staff arrives.",
    questionType: "recall",
    expectedConcepts: [
      "Move them immediately to a cool shaded or air-conditioned area",
      "Loosen tight clothing",
      "Cool the body with cold wet cloths, fans, or misting",
      "Offer small sips of cool water or ORS if conscious",
      "Call a teacher or school nurse immediately"
    ],
    sampleGoodAnswer: "1. Move them to a cool, shaded spot immediately. 2. Loosen their tight collar and shoes, and apply damp cold cloths to their neck and forehead. 3. Alert the teacher/nurse and give sips of cool water if conscious.",
    betterOptions: [
      "Move the person out of direct sunlight immediately into shade or AC.",
      "Apply cool water compresses to the neck, armpits, and groin where major blood vessels lie.",
      "Fan them vigorously to promote evaporative cooling.",
      "Do not give large gulps of ice water, which can induce stomach cramps."
    ],
    safetyPrinciple: "Heat stroke is a medical emergency where core body temperature exceeds 40°C. Immediate cooling saves brain tissue from permanent damage.",
    didYouKnow: "Hot, dry skin with no sweat during severe heat is a warning sign of advanced heat stroke, which requires immediate medical intervention."
  },

  // 9. SCHOOL BUS EMERGENCY (Decision, Age 8-10 / 11-14)
  {
    id: "bus-breakdown-1",
    category: "bus",
    categoryLabel: "School Bus Safety",
    ageGroup: "8-10",
    ageLabel: "Level 1: Beginner (8–10 yrs)",
    difficulty: 2,
    environment: "Highway Shoulder / Traffic Road",
    scenario: "Your school bus encounters engine smoke and pulls over onto the road shoulder. The bus driver opens the emergency door and instructs students to evacuate.",
    question: "What should you do after stepping out of the bus to stay safe from passing highway traffic?",
    questionType: "decision",
    expectedConcepts: [
      "Follow the driver or teacher's instructions",
      "Move completely off the road away from traffic",
      "Do not run into the road or lanes",
      "Stay together in a group on the embankment/pavement behind the crash barrier"
    ],
    sampleGoodAnswer: "After stepping out, I would stay calm, move well away from the road behind the safety barrier, stay with the group, and listen strictly to the teacher or driver.",
    betterOptions: [
      "Evacuate in an orderly line without pushing or collecting heavy bags.",
      "Move at least 30 meters away from the vehicle onto the outer grassy bank or barrier.",
      "Keep away from the road side where high-speed oncoming traffic passes.",
      "Form a buddy pair and do a head count with the bus attendant."
    ],
    safetyPrinciple: "Secondary collisions on highways cause more casualties than vehicle breakdowns. Evacuated passengers must always stay well behind guardrails.",
    didYouKnow: "Standard school buses are built with multiple emergency exits: rear doors, roof hatches, and push-out windows."
  },

  // 10. ADVANCED: MULTI-HAZARD RISK EVALUATION (Reflection & Decision, Age 15-17)
  {
    id: "adv-multi-hazard-1",
    category: "evacuation",
    categoryLabel: "Building Evacuation",
    ageGroup: "15-17",
    ageLabel: "Level 3: Advanced (15–17 yrs)",
    difficulty: 4,
    environment: "Multi-Storey School Auditorium",
    scenario: "You are on the 3rd floor auditorium when a fire alarm sounds. The main central stairwell is completely choked with heavy black smoke, but the secondary marked exterior emergency staircase is clear. Some younger students in panic are pushing toward the elevators.",
    question: "As a senior student leader, what two critical decisions must you enforce to prevent disaster?",
    questionType: "decision",
    expectedConcepts: [
      "Strictly forbid anyone from entering the elevator",
      "Reroute and guide students away from the smoke-filled stairwell",
      "Direct everyone in an orderly line to the secondary exterior emergency staircase",
      "Calm down panicking younger students to prevent crowd crushes"
    ],
    sampleGoodAnswer: "1. Block access to the elevators immediately and yell firmly that elevators fail during fires. 2. Redirect the crowd in an orderly single-file queue down the clear secondary exterior emergency stairs.",
    betterOptions: [
      "Physically position yourself to divert people away from both the smoke-filled corridor and the elevator bank.",
      "Use clear, authoritative commands: 'Stairs are blocked. Everyone follow me to the exterior emergency exit!'",
      "Maintain orderly spacing on the stairwell to prevent slips, falls, and crowd crush.",
      "Report to the assembly point coordinator that the primary central stairwell is compromised by smoke."
    ],
    safetyPrinciple: "LEADERSHIP & CROWD ORDER: In smoke events, panic and bottleneck stampedes cause severe asphyxiation. Decisive crowd redirection to secondary exits saves entire cohorts.",
    didYouKnow: "Elevator call buttons and optical sensors can be triggered by smoke, causing elevator doors to open on the exact floor where fire is raging."
  }
];
