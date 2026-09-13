import {
  CourseIntroContent,
  CourseGuidelineContent,
  DrillSituation,
  CourseScenario,
  AssessmentQuestion
} from "./types";

// ==========================================
// 1. CPR & BASIC LIFE SUPPORT DATA
// ==========================================

export const CPR_INTRO: CourseIntroContent = {
  whatItIs: "Cardiopulmonary Resuscitation (CPR) is an emergency procedure that combines chest compressions often with artificial ventilation (or continuous Hands-Only chest compressions) to manually preserve intact brain function until definitive medical measures are taken to restore spontaneous blood circulation and breathing in a person who is in cardiac arrest.",
  whyItMatters: "When a person suffers sudden cardiac arrest, blood circulation to the vital organs and brain ceases immediately. Clinical brain death begins in as few as 4 to 6 minutes. Immediate bystander CPR can double or triple a victim's chance of survival.",
  goldenRule: "Act fast. Call 112 / 108 immediately, and start pushing hard and fast in the center of the chest (100–120 BPM) until emergency medical personnel arrive.",
  recognizingEmergency: [
    "Sudden collapse or loss of consciousness with no response to loud shouting or tapping.",
    "Absence of normal breathing (person is not breathing or only exhibiting occasional, irregular agonal gasps).",
    "Agonal gasps sound like snorting, gurgling, or labored moans and are a reflex sign of cardiac arrest, NOT normal breathing.",
    "Skin, lips, or fingernail beds turning pale, bluish, or gray due to lack of oxygenated blood flow."
  ],
  helplineNumbers: [
    { name: "National Emergency Number", number: "112", note: "Unified emergency number across India and Europe" },
    { name: "Emergency Ambulance Service", number: "108", note: "Emergency medical dispatch & advanced life support" },
    { name: "Government Health Helpline", number: "102", note: "Maternal & pediatric referral transport" },
    { name: "NDRF Disaster Helpline", number: "1078", note: "National Disaster Response Force control room" }
  ],
  authorityReference: "Guidelines aligned with National Disaster Management Authority (NDMA), Ministry of Health & Family Welfare (MoHFW), and American Heart Association (AHA) standards."
};

export const CPR_GUIDELINES: CourseGuidelineContent = {
  awarenessDisclaimer: "This educational module provides public awareness and emergency decision-making guidance. It does NOT replace hands-on, accredited BLS (Basic Life Support) certification or medical training. To gain physical muscle memory, always train with qualified instructors on certified CPR training mannequins.",
  coreSteps: [
    {
      number: 1,
      title: "Check Scene Safety & Patient Responsiveness",
      detail: "Survey the immediate perimeter for live electrical wires, vehicle traffic, toxic fumes, or structural hazards. Tap the person firmly on both collarbones and shout loudly: 'Are you OK? Can you hear me?'",
      actionCallout: "If unresponsive and not breathing normally, treat as sudden cardiac arrest immediately.",
      caution: "Never move a trauma victim unless they are in immediate danger of fire, explosion, or building collapse."
    },
    {
      number: 2,
      title: "Call Emergency Services (112 / 108) & Fetch an AED",
      detail: "Point directly at a specific bystander: 'You in the blue shirt, call 112 right now, say we have an unresponsive adult, and fetch an AED (Automated External Defibrillator) immediately!'",
      actionCallout: "Put your phone on speaker so emergency dispatchers can guide you in real time."
    },
    {
      number: 3,
      title: "Position Hands in the Center of the Chest",
      detail: "Kneel beside the victim's chest. Place the heel of one hand in the center of the chest on the lower half of the sternum (breastbone). Interlock the fingers of your second hand on top. Keep your arms straight and lock your elbows.",
      actionCallout: "Stack your shoulders directly above your hands so your bodyweight drives the compression."
    },
    {
      number: 4,
      title: "Push Hard & Fast (100–120 Compressions/Minute)",
      detail: "Compress the chest at least 2 inches (5 cm) deep, but no more than 2.4 inches. Allow the chest to fully recoil back up between compressions without taking your hands off the chest.",
      actionCallout: "Cadence: Think of the song tempo of 'Stayin' Alive' (104 BPM) or 2 compressions per second."
    },
    {
      number: 5,
      title: "Deploy AED as Soon as Available",
      detail: "Turn on the AED immediately and follow the calm voice prompts. Bare the victim's chest, wipe dry if sweaty, apply the adhesive pads as shown on the diagram (upper right chest & lower left flank), and stand clear when instructed.",
      actionCallout: "Shout 'CLEAR!' loudly before any shock is delivered, and immediately resume chest compressions."
    }
  ],
  dos: [
    "DO call 112 / 108 before starting CPR if you are the sole rescuer with an adult.",
    "DO use your upper body weight and keep elbows locked straight to avoid exhausting your arm muscles.",
    "DO allow full chest recoil between compressions so the heart chambers can refill with blood.",
    "DO swap with another bystander every 2 minutes (about 5 cycles) if fatigued, minimizing pauses to under 10 seconds."
  ],
  donts: [
    "DON'T mistake abnormal agonal gasping or snorting for normal breathing.",
    "DON'T bounce your hands off the patient's sternum; keep heel of hand in firm contact.",
    "DON'T stop compressions to check for a pulse unless the victim shows clear signs of life (coughing, opening eyes, normal breathing).",
    "DON'T touch the victim while the AED is analyzing heart rhythm or delivering a shock."
  ],
  warningBoxes: [
    {
      title: "CRITICAL: Agonal Breathing vs Normal Breathing",
      text: "Agonal gasping occurs in up to 40% of cardiac arrest victims in the first few minutes. It sounds like gasping for air, snorting, or irregular groans. It is an involuntary brainstem reflex, NOT breathing. ALWAYS begin CPR immediately.",
      level: "danger"
    },
    {
      title: "Rib Cracking Sensation",
      text: "When compressing 2 inches deep, you may feel or hear ribs clicking or cartilage fracturing, especially in elderly victims. Do NOT stop. Broken ribs can heal; irreversible brain death from lack of oxygen cannot.",
      level: "warning"
    }
  ],
  emergencyDecisions: [
    { condition: "Victim is unresponsive, gasping irregularly", action: "Call 112 immediately and initiate Hands-Only CPR." },
    { condition: "AED arrives while doing CPR", action: "Turn on AED immediately; pause compressions only when applying pads or when AED says 'Analyzing rhythm' / 'Stand clear'." },
    { condition: "Victim vomits during CPR", action: "Roll them onto their side (recovery position) to clear airway with a finger sweep, then immediately return to back and resume compressions." }
  ]
};

export const CPR_DRILLS: DrillSituation[] = [
  {
    id: "cpr-drill-1",
    title: "The Sudden Collapse",
    situation: "During an assembly, an adult collapses forward onto the floor and does not move. You run over to assist.",
    context: "Initial Scene Assessment & Primary Evaluation",
    environment: "Auditorium / Public Hall",
    options: [
      {
        id: "opt-1a",
        text: "Splash cold water on the person's face and shake their head vigorously to wake them up.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Splashing water risks airway aspiration, and shaking the head can cause severe spinal injury. Sudden collapse requires immediate responsiveness and breathing checks.",
        riskLevel: "Critical"
      },
      {
        id: "opt-1b",
        text: "Check scene safety, tap firmly on their collarbones, and shout loudly 'Are you OK? Can you hear me?'",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Always check scene safety first, then confirm unresponsiveness with firm collarbone taps and loud verbal cues before initiating cardiac arrest protocols.",
        riskLevel: "Low"
      },
      {
        id: "opt-1c",
        text: "Offer them a hot sugary drink or water in case they have low blood sugar.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Never attempt to pour liquids into the mouth of an unresponsive person. This will block their airway and cause choking or drowning.",
        riskLevel: "Critical"
      }
    ]
  },
  {
    id: "cpr-drill-2",
    title: "Evaluating the Breathing Pattern",
    situation: "The collapsed person does not respond to your collarbone taps. You look at their chest: they make an occasional harsh snorting gasp every 15 seconds.",
    context: "Breathing vs Agonal Gasping Evaluation",
    environment: "Ground Floor Corridor",
    options: [
      {
        id: "opt-2a",
        text: "Assume they are breathing normally since air is entering their throat, and wait for them to recover.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Agonal gasps are an involuntary dying reflex, NOT normal breathing. Delaying CPR for agonal gasps leads to rapid brain death.",
        riskLevel: "Critical"
      },
      {
        id: "opt-2b",
        text: "Recognize agonal gasps as a sign of cardiac arrest: shout for 112/108, request an AED, and begin chest compressions immediately.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Correct! Agonal gasping must always be treated as sudden cardiac arrest. Continuous compressions are required immediately.",
        riskLevel: "Low"
      },
      {
        id: "opt-2c",
        text: "Place them sitting upright against a wall to help open their lungs.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Sitting an unconscious patient upright causes gravity to drain remaining blood from the brain. Victims must be flat on their back on a hard surface.",
        riskLevel: "High"
      }
    ]
  },
  {
    id: "cpr-drill-3",
    title: "Hand Placement and Compression Technique",
    situation: "The patient is flat on their back on the firm tiled floor. You are ready to deliver compressions.",
    context: "Chest Compression Mechanics",
    environment: "Indoor Tiled Floor",
    options: [
      {
        id: "opt-3a",
        text: "Place both hands over their upper abdomen (stomach) and push upwards rapidly.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Abdominal thrusts are used for conscious choking victims, never for cardiac arrest! Compressing the stomach causes organ laceration and severe vomiting.",
        riskLevel: "Critical"
      },
      {
        id: "opt-3b",
        text: "Place the heel of one hand in the center of the breastbone, interlock fingers of the other hand, lock elbows, and compress 2 inches deep at 100-120 BPM.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Perfect technique! Center of chest (lower half of sternum), heel of hand, locked elbows, driving bodyweight down 2 to 2.4 inches deep.",
        riskLevel: "Low"
      },
      {
        id: "opt-3c",
        text: "Use gentle fingertip pressure at 60 beats per minute to avoid hurting the patient.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Gentle fingertip pressure cannot compress the rib cage to pump the heart. Compressions must be at least 2 inches deep at 100-120 BPM.",
        riskLevel: "High"
      }
    ]
  },
  {
    id: "cpr-drill-4",
    title: "AED Arrives at the Scene",
    situation: "A teacher arrives running with an Automated External Defibrillator (AED). You are in the middle of chest compressions.",
    context: "AED Integration Protocol",
    environment: "Auditorium",
    options: [
      {
        id: "opt-4a",
        text: "Continue compressions while the second rescuer powers on the AED, exposes the bare chest, and attaches the pads according to diagram.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Excellent team coordination! Chest compressions should continue with minimal interruption while the AED is opened, turned on, and pads applied.",
        riskLevel: "Low"
      },
      {
        id: "opt-4b",
        text: "Stop CPR completely and wait 5 minutes for paramedics to operate the machine because AEDs are only for doctors.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Public-access AEDs are designed for ordinary citizens and students. They speak clear automated step-by-step instructions. Never wait.",
        riskLevel: "Critical"
      },
      {
        id: "opt-4c",
        text: "Place the AED pads directly over the victim's winter jacket and thick clothing.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Pads must adhere directly to bare, dry skin. Clothing prevents electrical conductivity and will cause the AED analysis to fail.",
        riskLevel: "High"
      }
    ]
  },
  {
    id: "cpr-drill-5",
    title: "AED Prompts: 'Shock Advised. Stand Clear!'",
    situation: "The AED finishes analyzing the rhythm and says: 'Shock advised. Charging. Stand clear of patient.'",
    context: "Defibrillation Safety Clearance",
    environment: "Auditorium",
    options: [
      {
        id: "opt-5a",
        text: "Hold the patient's wrist to comfort them while the shock is delivered.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Anyone touching the patient during an electrical shock will receive the high-voltage discharge, potentially inducing cardiac arrest in the rescuer.",
        riskLevel: "Critical"
      },
      {
        id: "opt-5b",
        text: "Raise hands, shout loudly 'EVERYONE STAND CLEAR!', verify no one is touching the patient, and press the flashing shock button.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Correct! Visual check and loud verbal clearance are vital. Once the shock delivers, immediately resume chest compressions without delay.",
        riskLevel: "Low"
      }
    ]
  }
];

export const CPR_SCENARIOS: CourseScenario[] = [
  {
    id: "cpr-scen-school",
    environment: "School",
    locationTag: "High School Basketball Court",
    title: "Coach Collapses Mid-Game",
    situation: "During an inter-school tournament, the 48-year-old basketball coach suddenly clutches his chest and falls backward onto the hardwood floor. He is motionless.",
    dilemma: "Students and players are gathering around, screaming in panic. You are a student who completed SafeDrill CPR training.",
    decisions: [
      {
        id: "dec-1",
        text: "Take charge: Instruct the team captain to call 112, send the referee to fetch the school gym AED, and immediately start Hands-Only CPR on the coach's chest.",
        isBest: true,
        outcome: "Clear leadership calms panic, emergency services are en route in 30 seconds, and compressions keep the coach's brain oxygenated.",
        safetyTakeaway: "Direct bystander assignment ('You call 112, you get the AED') overcomes panic and the bystander effect."
      },
      {
        id: "dec-2",
        text: "Fan the coach with towels, lift his legs onto a bench, and wait for the school principal to arrive before taking medical steps.",
        isBest: false,
        outcome: "Valuable minutes are lost. Without chest compressions, irreversible cerebral hypoxia sets in.",
        safetyTakeaway: "Cardiac arrest requires immediate chest compressions. Waiting for administrative approval is fatal."
      }
    ]
  },
  {
    id: "cpr-scen-home",
    environment: "Home",
    locationTag: "Living Room at Night",
    title: "Grandparent Unresponsive on Sofa",
    situation: "You walk into the living room and find your 70-year-old grandfather slumped over. He does not wake up when shaken gently, and his breathing is making a deep gurgling rattle.",
    dilemma: "He is on a soft spring mattress sofa. Can compressions be done effectively here?",
    decisions: [
      {
        id: "dec-1",
        text: "With family assistance, carefully ease him down onto the hard floor, call 112 on speakerphone, and start chest compressions on the hard surface.",
        isBest: true,
        outcome: "Compressions on a hard surface allow the breastbone to be compressed 2 inches deep. On a soft sofa, compressions just push the body into the mattress.",
        safetyTakeaway: "Effective CPR requires a hard, unyielding surface underneath the patient's spine."
      },
      {
        id: "dec-2",
        text: "Leave him on the soft sofa and push gently on his chest so you do not hurt his back.",
        isBest: false,
        outcome: "The soft cushions absorb the downward force; virtually zero blood is pumped through his coronary arteries.",
        safetyTakeaway: "Soft mattresses absorb compression force. Always move the patient to the floor."
      }
    ]
  },
  {
    id: "cpr-scen-public",
    environment: "Public",
    locationTag: "Metro Rail Platform",
    title: "Commuter Collapses on Busy Commuter Platform",
    situation: "A commuter falls face down on the platform. A crowd gathers, but people hesitate to touch the stranger, fearing legal liability.",
    dilemma: "You want to step in, but people in the crowd warn you: 'Don't touch him, you might get in trouble with the police!'",
    decisions: [
      {
        id: "dec-1",
        text: "Know the Good Samaritan Law (which protects bystanders helping in emergencies in India & worldwide): roll him to his back, check for response, and begin Hands-Only CPR.",
        isBest: true,
        outcome: "Bystander intervention begins within 45 seconds. Metro station staff arrive with an AED in 2 minutes.",
        safetyTakeaway: "The Supreme Court of India Good Samaritan guidelines legally protect citizens rendering emergency first aid from harassment or liability."
      },
      {
        id: "dec-2",
        text: "Stand back and wait until the transit security guard walks down the 300-meter platform.",
        isBest: false,
        outcome: "By the time security arrives 5 minutes later, the window for successful resuscitation has drastically narrowed.",
        safetyTakeaway: "Every minute without CPR reduces the chance of survival by 7 to 10 percent."
      }
    ]
  }
];

export const CPR_ASSESSMENT: AssessmentQuestion[] = [
  {
    id: "cpr-q1",
    question: "What is the recommended chest compression rate for adult Hands-Only CPR?",
    type: "mcq",
    options: [
      "40 to 60 compressions per minute",
      "70 to 80 compressions per minute",
      "100 to 120 compressions per minute",
      "150 to 180 compressions per minute"
    ],
    correctAnswerIndex: 2,
    explanation: "The internationally recognized compression rate is 100 to 120 compressions per minute (matching the beat of the song 'Stayin' Alive').",
    domainArea: "Compression Rate"
  },
  {
    id: "cpr-q2",
    question: "An unresponsive person is making occasional snorting, labored gasps every 10-15 seconds. What is your correct course of action?",
    type: "scenario",
    options: [
      "Do nothing; this means they are breathing on their own",
      "Treat as sudden cardiac arrest: call 112 immediately and begin chest compressions",
      "Offer them sips of water to lubricate their throat",
      "Sit them upright against a wall"
    ],
    correctAnswerIndex: 1,
    explanation: "Agonal gasping is an involuntary brainstem reflex seen in cardiac arrest, not normal breathing. CPR must be started immediately.",
    domainArea: "Recognizing Cardiac Arrest"
  },
  {
    id: "cpr-q3",
    question: "What is the correct depth of chest compressions on an average adult victim?",
    type: "mcq",
    options: [
      "At least 0.5 inches (1 cm)",
      "At least 2 inches (5 cm), but no more than 2.4 inches (6 cm)",
      "Exactly 4 inches (10 cm)",
      "As deep as possible until ribs are broken"
    ],
    correctAnswerIndex: 1,
    explanation: "Adequate depth is at least 2 inches (5 cm) to effectively squeeze the heart between the sternum and spine, without exceeding 2.4 inches.",
    domainArea: "Compression Depth"
  },
  {
    id: "cpr-q4",
    question: "When applying an Automated External Defibrillator (AED), where should the two adhesive electrode pads be placed on a bare adult chest?",
    type: "mcq",
    options: [
      "Both pads on the stomach",
      "Upper right chest (below collarbone) and lower left side (ribs below armpit)",
      "One on the forehead and one on the chest",
      "Both pads directly on the center of the breastbone"
    ],
    correctAnswerIndex: 1,
    explanation: "Pads are placed on the upper right chest and lower left flank so the electrical current passes directly through the heart muscle.",
    domainArea: "AED Pad Placement"
  },
  {
    id: "cpr-q5",
    question: "Why must you shout 'STAND CLEAR!' before the AED delivers a shock?",
    type: "decision",
    options: [
      "To keep bystanders quiet so the AED can record sound",
      "To make sure nobody is in physical contact with the victim, preventing accidental electrocution of rescuers",
      "To give the victim room to sit up immediately",
      "Because the AED will explode if touched"
    ],
    correctAnswerIndex: 1,
    explanation: "If someone is touching the victim when the high-voltage electrical shock discharges, the current will travel into the rescuer, risking fatal arrhythmias.",
    domainArea: "Defibrillation Safety"
  }
];


// ==========================================
// 2. SEVERE BLEEDING & FIRST AID DATA
// ==========================================

export const BLEEDING_INTRO: CourseIntroContent = {
  whatItIs: "Severe bleeding (hemorrhage) occurs when blood vessels—especially major arteries or large veins—are lacerated or severed. Life-threatening arterial bleeding can cause catastrophic blood volume depletion and fatal hemorrhagic shock in as little as 3 to 5 minutes.",
  whyItMatters: "Uncontrolled hemorrhage is the number one cause of preventable death in trauma, vehicular accidents, and disaster scenes. Direct pressure and early tourniquet application applied by immediate bystanders can preserve life before emergency surgical teams arrive.",
  goldenRule: "Find the bleeder, press relentlessly with locked arms and bodyweight, and do not let go. If bleeding from a limb is not stopping, deploy a tourniquet high and tight.",
  recognizingEmergency: [
    "Blood spurting or pumping rhythmically from a wound (arterial bleeding).",
    "Blood that will not stop flowing rapidly or is pooling continuously on the ground.",
    "Clothing or dressings completely soaked in bright red blood within seconds.",
    "Partial or total loss of a limb (traumatic amputation).",
    "Victim becoming pale, confused, clammy, and weak (signs of impending hemorrhagic shock)."
  ],
  helplineNumbers: [
    { name: "Unified Emergency Service", number: "112", note: "Dispatch for police, ambulance, and fire" },
    { name: "Emergency Trauma & Ambulance", number: "108", note: "Urgent trauma medical dispatch" },
    { name: "Highway Emergency Services", number: "1033", note: "National Highway Authority road trauma rescue" }
  ],
  authorityReference: "Curriculum aligned with STOP THE BLEED® (American College of Surgeons Committee on Trauma), International Federation of Red Cross, and MoHFW trauma guidelines."
};

export const BLEEDING_GUIDELINES: CourseGuidelineContent = {
  awarenessDisclaimer: "This module teaches basic bystander hemorrhage control awareness. It does not replace clinical trauma life support training. Always ensure medical emergency services (112/108) are dispatched immediately whenever life-threatening bleeding is identified.",
  coreSteps: [
    {
      number: 1,
      title: "Ensure Scene Safety & Expose the Wound",
      detail: "Check for ongoing threats (traffic, shattered glass, falling debris, machinery). Cut or tear away clothing over the injured area to expose the exact anatomical source of bleeding.",
      actionCallout: "Do not guess where the blood is coming from through soaked clothes. Look directly at the wound."
    },
    {
      number: 2,
      title: "Apply Continuous Direct Bodyweight Pressure",
      detail: "Place sterile gauze, a clean cloth, or even your gloved hands directly over the bleeding vessel. Lock your elbows straight and press down using your full upper body weight. Do NOT peek to see if bleeding stopped.",
      actionCallout: "Hold uninterrupted pressure for at least 3 to 5 continuous minutes."
    },
    {
      number: 3,
      title: "Pack Deep Cavity Wounds (Junctional Areas)",
      detail: "For deep wounds in junctional areas (groin, armpit, neck base) where tourniquets cannot be placed: pack clean gauze deep into the wound cavity directly against the bleeding vessel using your fingertips, then apply firm two-handed pressure over the top.",
      actionCallout: "Fill the cavity firmly before pressing down with both palms."
    },
    {
      number: 4,
      title: "Apply a Tourniquet (For Limbs Only)",
      detail: "If life-threatening bleeding from an arm or leg continues: wrap a commercial windlass tourniquet 2 to 3 inches above the wound (closer to the torso, never over a joint). Pull the strap completely tight, twist the windlass rod until bright red bleeding completely stops, and lock the rod in the clip.",
      actionCallout: "Document the application time (e.g., T: 14:35) on the white time strap."
    },
    {
      number: 5,
      title: "Prevent and Monitor for Shock",
      detail: "Keep the injured person lying flat. Cover them with a jacket or blanket to prevent hypothermia (cold blood fails to clot). Keep them calm, do NOT give food or water, and reassure them while awaiting paramedics.",
      actionCallout: "Hypothermia severely accelerates hemorrhagic shock."
    }
  ],
  dos: [
    "DO use your entire upper body weight with straight locked arms when holding direct pressure.",
    "DO place additional gauze or cloth on top if blood seeps through—never peel off the first layer, as that rips away forming clots.",
    "DO apply tourniquets 2 to 3 inches above the wound on arms and legs if severe arterial bleeding continues.",
    "DO note the exact time the tourniquet was tightened so trauma surgeons know the ischemia window."
  ],
  donts: [
    "DON'T ever loosen or remove a tourniquet once tightened; only trauma surgeons in a hospital may release it.",
    "DON'T apply a tourniquet over an elbow or knee joint; position it above the joint closer to the heart.",
    "DON'T waste time with makeshift string or thin wire that cuts tissue without stopping arterial blood flow.",
    "DON'T give the victim water or food, even if they complain of severe thirst, because emergency surgery requires an empty stomach."
  ],
  warningBoxes: [
    {
      title: "Tourniquets Cause Pain",
      text: "A properly tightened tourniquet WILL cause significant pain. Explain to the victim: 'This will hurt, but it is stopping you from bleeding to death.' Do NOT loosen it because of pain.",
      level: "danger"
    },
    {
      title: "Never Apply Tourniquets to Neck or Torso",
      text: "Tourniquets are strictly for extremities (arms and legs). For neck, groin, or chest wounds, use wound packing and relentless direct manual pressure.",
      level: "warning"
    }
  ],
  emergencyDecisions: [
    { condition: "Blood is spurting rhythmically from arm wound", action: "Apply immediate bodyweight pressure; prepare and apply a tourniquet 2-3 inches above the wound." },
    { condition: "Blood soaking through original gauze pad", action: "Do NOT remove original gauze. Add more gauze layers directly on top and press down even harder." },
    { condition: "Victim is trembling, pale, and thirsty", action: "Lay them flat, cover with blanket to preserve core warmth, reassure them, and do NOT give liquids." }
  ]
};

export const BLEEDING_DRILLS: DrillSituation[] = [
  {
    id: "bleed-drill-1",
    title: "Heavy Bleeding from a Forearm Laceration",
    situation: "A worker shatters a large glass pane. A 4-inch deep laceration on the forearm is spurting bright red blood in rhythmic pulses.",
    context: "Arterial Hemorrhage Decision",
    environment: "Workshop / Construction Area",
    options: [
      {
        id: "b-opt-1a",
        text: "Wash the wound under running tap water for 10 minutes to remove any dirt before touching it.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Washing an arterial bleeder wastes fatal minutes and washes away nascent blood clots. Spurting blood must be controlled with direct pressure immediately.",
        riskLevel: "Critical"
      },
      {
        id: "b-opt-1b",
        text: "Shout for a first aid kit and 112, place a clean cloth over the wound, lock your elbows, and lean your bodyweight directly onto the wound.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Correct! Calling emergency dispatch and applying immediate unrelenting direct bodyweight pressure is the first line of defense.",
        riskLevel: "Low"
      },
      {
        id: "b-opt-1c",
        text: "Tie a thin rubber band tightly around their wrist.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Thin rubber bands cut into tissue and stop only venous return while arterial blood keeps pumping, making bleeding worse.",
        riskLevel: "High"
      }
    ]
  },
  {
    id: "bleed-drill-2",
    title: "Dressing Becomes Blood-Soaked",
    situation: "You have been holding direct pressure with a cloth for 2 minutes. The cloth is now completely soaked in blood and red liquid is leaking out from the sides.",
    context: "Managing Breakthrough Bleeding",
    environment: "Kitchen / Workshop",
    options: [
      {
        id: "b-opt-2a",
        text: "Pull the soaked cloth off the wound to examine how deep the cut is, then replace it with a fresh dry cloth.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Pulling off soaked dressings tears away fragile fibrin blood clots, causing bleeding to restart at maximum intensity. Never remove the first layer!",
        riskLevel: "Critical"
      },
      {
        id: "b-opt-2b",
        text: "Keep the initial cloth in place, stack more sterile gauze or clean towels directly on top, and push down with even greater bodyweight pressure.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Spot on! Always build up layers on top of the original dressing to preserve the clotting base and increase compressive force.",
        riskLevel: "Low"
      }
    ]
  },
  {
    id: "bleed-drill-3",
    title: "Tourniquet Deployment on a Limb",
    situation: "Despite stacked dressings and direct pressure, bright arterial blood is still pooling heavily from a deep leg wound above the calf. A commercial windlass tourniquet is available.",
    context: "Extremity Tourniquet Application",
    environment: "Roadside Accident",
    options: [
      {
        id: "b-opt-3a",
        text: "Position the tourniquet directly over the knee joint because bones provide more support.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Never place tourniquets over joints. The joint prevents the strap from occluding the deep femoral or popliteal arteries.",
        riskLevel: "Critical"
      },
      {
        id: "b-opt-3b",
        text: "Position the tourniquet 2 to 3 inches above the wound on the thigh (above the joint), pull the band free of slack, and twist the windlass rod until bleeding stops.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Correct! 2 to 3 inches proximal (above) the wound, eliminate all strap slack before turning the rod, and twist until bleeding ceases.",
        riskLevel: "Low"
      }
    ]
  },
  {
    id: "bleed-drill-4",
    title: "The Victim Complains of Excruciating Pain",
    situation: "The windlass is turned 3 times. The arterial bleeding has completely stopped, but the victim screams that the tourniquet is crushing their leg painfully.",
    context: "Managing Patient Distress & Tourniquet Discipline",
    environment: "Roadside",
    options: [
      {
        id: "b-opt-4a",
        text: "Loosen the windlass by one full turn to relieve the pain for a few minutes.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Loosening a tourniquet will re-open severed arteries, leading to sudden massive blood loss and death. Tourniquets must remain locked until surgery.",
        riskLevel: "Critical"
      },
      {
        id: "b-opt-4b",
        text: "Reassure the patient: explain that the pain means the tourniquet is working to save their life, lock the rod into the clip, and write the current time on the strap.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Tourniquet pain is expected and normal. Reassure the patient, keep the rod locked in the clip, and document the precise time applied.",
        riskLevel: "Low"
      }
    ]
  }
];

export const BLEEDING_SCENARIOS: CourseScenario[] = [
  {
    id: "bleed-scen-sports",
    environment: "Sports",
    locationTag: "Football Field / Athletic Track",
    title: "Deep Shin Compound Laceration During Match",
    situation: "A soccer player slides into a damaged metal goalpost. A 15-cm deep laceration on the lower leg is bleeding heavily onto the grass.",
    dilemma: "Other teammates want to carry the player off the field to the bench immediately.",
    decisions: [
      {
        id: "b-dec-1",
        text: "Tell players not to move him. Apply a thick trauma dressing with firm two-handed pressure directly on the field, call 108/112, and elevate the leg gently if no bone fracture is suspected.",
        isBest: true,
        outcome: "Immediate bleeding control prevents hypovolemic shock, and keeping the player still avoids aggravating tissue damage.",
        safetyTakeaway: "Control active hemorrhage before attempting patient transport."
      },
      {
        id: "b-dec-2",
        text: "Pick the player up by the arms and legs to drag him to the locker room while blood is still flowing.",
        isBest: false,
        outcome: "Moving the patient accelerates heart rate and blood loss, increasing shock severity.",
        safetyTakeaway: "Never move a bleeding trauma patient until active hemorrhage is checked."
      }
    ]
  },
  {
    id: "bleed-scen-school",
    environment: "School",
    locationTag: "Chemistry Laboratory",
    title: "Broken Glass Flask in Laboratory",
    situation: "A student drops a 1-liter glass beaker while cleaning up. A jagged shard punctures the fleshy part of the palm and base of wrist, causing continuous dark-red pooling blood.",
    dilemma: "A shard of glass may still be embedded in the wound. What is the safest way to apply pressure?",
    decisions: [
      {
        id: "b-dec-1",
        text: "Do NOT press down directly onto an impaled glass shard. Place rolled gauze on both sides of the object to stabilize it, and wrap bandage around to apply pressure around the shard.",
        isBest: true,
        outcome: "The glass is immobilized without driving it deeper into underlying nerves or tendons.",
        safetyTakeaway: "Never push directly down on an impaled foreign object. Build pressure dressings around it."
      },
      {
        id: "b-dec-2",
        text: "Yank the glass shard out quickly with your fingers so you can press flat on the cut.",
        isBest: false,
        outcome: "Yanking out an impaled object unplugs the puncture canal, triggering uncontrollable hemorrhage.",
        safetyTakeaway: "Leave embedded objects in place; let emergency room surgeons remove them."
      }
    ]
  },
  {
    id: "bleed-scen-road",
    environment: "Public",
    locationTag: "City Road Intersection",
    title: "Motorcycle Skid with Severe Thigh Abrasion",
    situation: "A motorcycle skids on gravel. The rider has sustained deep lacerations across the outer thigh. Blood is soaking through denim jeans, and the rider is shivering and pale.",
    dilemma: "A crowd is offering cold water to the shivering rider. What is your priority?",
    decisions: [
      {
        id: "b-dec-1",
        text: "Expose the thigh, apply direct bodyweight pressure, cover the rider with a dry jacket to maintain body heat, and politely prevent bystanders from giving water.",
        isBest: true,
        outcome: "Hemorrhage is contained, core body temperature is protected to maintain blood clotting, and empty stomach is preserved for surgery.",
        safetyTakeaway: "Shock management requires warmth, horizontal positioning, and zero oral intake."
      },
      {
        id: "b-dec-2",
        text: "Pour water into the rider's mouth and sit him up against a lamp post.",
        isBest: false,
        outcome: "Drinking water risks pulmonary aspiration in a semi-conscious patient, and sitting up deprives the brain of blood.",
        safetyTakeaway: "Never give food or fluids to a trauma victim in shock."
      }
    ]
  }
];

export const BLEEDING_ASSESSMENT: AssessmentQuestion[] = [
  {
    id: "bleed-q1",
    question: "What is the hallmark characteristic of life-threatening arterial bleeding?",
    type: "mcq",
    options: [
      "Dark red blood that trickles slowly from capillaries",
      "Bright red blood spurting rhythmically in sync with the heartbeat",
      "Clear fluid with minor blood speckles",
      "Blood that forms a hard scab within 5 seconds"
    ],
    correctAnswerIndex: 1,
    explanation: "Arterial bleeding comes from high-pressure arteries, resulting in bright red, pulsating or spurting flow that requires immediate emergency intervention.",
    domainArea: "Recognizing Severe Bleeding"
  },
  {
    id: "bleed-q2",
    question: "If blood soaks through the first gauze pad you placed on a deep wound, what should you do?",
    type: "decision",
    options: [
      "Remove the soaked gauze to see how bad the wound is",
      "Do NOT remove the original gauze; place additional gauze on top and apply even firmer pressure",
      "Stop pressing and apply antibiotic ointment",
      "Pour ice water on the wound"
    ],
    correctAnswerIndex: 1,
    explanation: "Removing the initial dressing disrupts developing blood clots. Always layer fresh dressings directly on top and maintain continuous pressure.",
    domainArea: "Direct Pressure Technique"
  },
  {
    id: "bleed-q3",
    question: "Where should a commercial tourniquet be placed on an extremity with uncontrolled bleeding?",
    type: "mcq",
    options: [
      "Directly over the center of the knee or elbow joint",
      "2 to 3 inches above the wound (closer to the heart/torso), avoiding joints",
      "Below the wound near the fingertips or toes",
      "Around the person's abdomen"
    ],
    correctAnswerIndex: 1,
    explanation: "Tourniquets are positioned 2 to 3 inches above the wound on a limb (proximal to heart), never over a joint which prevents arterial occlusion.",
    domainArea: "Tourniquet Placement"
  },
  {
    id: "bleed-q4",
    question: "Why is it dangerous to give water or food to a severely bleeding person who feels thirsty and faint?",
    type: "scenario",
    options: [
      "Water makes the blood too thin to circulate",
      "They may require emergency surgery and anesthesia, which requires an empty stomach to prevent vomiting and lung aspiration",
      "Water increases the body temperature too quickly",
      "Food interferes with the white blood cells"
    ],
    correctAnswerIndex: 1,
    explanation: "Trauma victims frequently require immediate general anesthesia and surgery. Having food or liquids in the stomach creates a severe aspiration pneumonia risk.",
    domainArea: "Shock Management"
  },
  {
    id: "bleed-q5",
    question: "Once a tourniquet is applied and the windlass rod is tightened, when should a bystander loosen it?",
    type: "mcq",
    options: [
      "Every 10 minutes to allow fresh blood into the limb",
      "As soon as the patient complains that it hurts too much",
      "NEVER — only qualified medical doctors at a hospital should release a tourniquet",
      "When the victim falls asleep"
    ],
    correctAnswerIndex: 2,
    explanation: "Bystanders must NEVER loosen a tourniquet once applied. Periodic loosening can cause fatal hemorrhage and fatal reperfusion toxins.",
    domainArea: "Tourniquet Safety"
  }
];


// ==========================================
// 3. FIRE EXTINGUISHER & FIRE SAFETY DATA
// ==========================================

export const FIRE_INTRO: CourseIntroContent = {
  whatItIs: "Fire safety awareness encompasses recognizing fire hazards, raising immediate alarms, orderly building evacuation, and the proper, safe utilization of portable fire extinguishers for small, incipient-stage fires.",
  whyItMatters: "A small wastebasket fire can flash over to engulf an entire room in under 3 minutes, generating toxic gases like carbon monoxide and hydrogen cyanide. Knowing when to fight a small fire—and more importantly, when to evacuate immediately—saves lives.",
  goldenRule: "LIFE SAFETY FIRST. Always evacuate if the fire is taller than you, if smoke is accumulating, or if your escape path is threatened. Only attempt to extinguish an incipient fire if you have an unblocked exit at your back.",
  recognizingEmergency: [
    "Smell of burning electrical insulation, plastic, or combustible materials.",
    "Activation of building smoke alarms, heat detectors, or sprinkler water flows.",
    "Visible smoke or flames spreading beyond an enclosed container.",
    "Remember: smoke inhalation kills far more people in fires than flames do."
  ],
  helplineNumbers: [
    { name: "Fire & Rescue Brigade", number: "101", note: "Emergency Fire Services dispatch across India" },
    { name: "Unified Emergency Response", number: "112", note: "Police, Fire, and Medical unified dispatch" },
    { name: "Disaster Management Helpline", number: "1070 / 1078", note: "State / National Disaster Response" }
  ],
  authorityReference: "Guidelines aligned with National Building Code of India (NBC 2016 Fire & Life Safety), NDRF, and National Fire Protection Association (NFPA) standard protocols."
};

export const FIRE_GUIDELINES: CourseGuidelineContent = {
  awarenessDisclaimer: "This module provides educational fire safety and extinguisher awareness. It does NOT make you a certified firefighter. In any real-world fire incident, always prioritize raising the alarm, immediate evacuation, and calling emergency services (101/112). Never place yourself in danger.",
  coreSteps: [
    {
      number: 1,
      title: "Sound the Alarm & Call Fire Services (101 / 112)",
      detail: "Shout 'FIRE! EVACUATE!' to alert building occupants. Pull the nearest manual fire call point (pull station) on the wall. Call 101 or 112 immediately with the exact address and landmark.",
      actionCallout: "Never assume someone else has already called the fire brigade."
    },
    {
      number: 2,
      title: "Assess Fire Size & Maintain an Escape Route",
      detail: "Only attempt to use an extinguisher if the fire is in its incipient stage (smaller than a wastepaper basket) and you have a clear, unobstructed exit door directly behind your back.",
      actionCallout: "If the fire is spreading or smoke reaches chest level, leave immediately and close the door."
    },
    {
      number: 3,
      title: "Identify the Correct Extinguisher Type",
      detail: "Check the label on the extinguisher cylinder: Class A (solids like wood/paper), Class B (flammable liquids), Class C (flammable gases), Class E/Electrical (energized electrical equipment). ABC Dry Chemical Powder or CO2 are standard for general facilities.",
      actionCallout: "NEVER use a water extinguisher on electrical fires or burning oil/grease!"
    },
    {
      number: 4,
      title: "Execute the P.A.S.S. Technique",
      detail: "P - PULL the safety pin and break plastic seal. A - AIM the nozzle low at the BASE of the flames. S - SQUEEZE the operating handle steadily. S - SWEEP side-to-side across the base of the fire until completely smothered.",
      actionCallout: "Stand 6 to 8 feet (2 meters) back from the flames before squeezing."
    },
    {
      number: 5,
      title: "Back Away Safely and Evacuate",
      detail: "Once flames appear out, do NOT turn your back on the site. Back away slowly while keeping your eyes on the area to watch for sudden re-ignition. Evacuate to the designated outdoor assembly point.",
      actionCallout: "Close interior doors behind you as you evacuate to compartmentalize smoke."
    }
  ],
  dos: [
    "DO keep your back to an unblocked exit door at all times when discharging an extinguisher.",
    "DO aim low at the burning fuel embers at the base, NOT at the high smoke or flickering flames.",
    "DO feel doors with the back of your hand before opening during an evacuation: if warm, do NOT open.",
    "DO stay low below the thermal smoke layer where oxygen is cleaner and temperatures are lower."
  ],
  donts: [
    "DON'T ever attempt to fight a fire if it is taller than you or spreading rapidly.",
    "DON'T throw water onto hot cooking oil or electrical equipment (water causes explosive steam flashovers).",
    "DON'T use elevators during a fire evacuation; always use the fire-rated stairwells.",
    "DON'T turn your back on an extinguished fire—unseen smoldering embers can suddenly reignite."
  ],
  warningBoxes: [
    {
      title: "Extinguisher Discharge Duration",
      text: "A standard portable 5kg fire extinguisher empties in only 10 to 15 seconds! You do not have infinite discharge time. Aim low and make every second count.",
      level: "warning"
    },
    {
      title: "Smoke Inhalation Hazard",
      text: "Modern building furniture releases hydrogen cyanide, carbon monoxide, and toxic phosgene when burned. Two breaths of dense toxic smoke can render an adult unconscious. Always stay low and evacuate.",
      level: "danger"
    }
  ],
  emergencyDecisions: [
    { condition: "Fire is spreading up the curtains towards the ceiling", action: "Do NOT attempt an extinguisher. Evacuate immediately, close the room door, and exit the building." },
    { condition: "Door handle is hot to the touch", action: "Do NOT open the door. The hallway is in flashover. Seal bottom crack with cloth and signal from window." },
    { condition: "Small paper fire in metal dustbin with exit at your back", action: "Deploy ABC Dry Chemical extinguisher using P.A.S.S. from 6-8 feet away." }
  ]
};

export const FIRE_DRILLS: DrillSituation[] = [
  {
    id: "fire-drill-1",
    title: "Small Trash Can Fire in Office / Classroom",
    situation: "A paper recycling bin in the corner catches fire from a discarded battery. Flames are about 1 foot high. The exit door is 5 feet behind you.",
    context: "Incipient Fire Assessment & Initial Action",
    environment: "Classroom / Office",
    options: [
      {
        id: "f-opt-1a",
        text: "Sound the alarm to alert others, confirm your back is to the unblocked exit, retrieve the nearby ABC extinguisher, and prepare to discharge.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Correct! Alert others first, ensure an exit path is clear at your back, and use an appropriate ABC extinguisher for an incipient fire.",
        riskLevel: "Low"
      },
      {
        id: "f-opt-1b",
        text: "Stand between the fire and the wall, blocking your own exit, and stomp on the flames with sneakers.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Stomping on flames ignites footwear and clothing, and blocking your own escape route risks getting trapped.",
        riskLevel: "Critical"
      },
      {
        id: "f-opt-1c",
        text: "Ignore the fire and wait 30 minutes to see if it extinguishes itself.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Fires double in size every 30 to 60 seconds in furnished rooms. Immediate action is critical.",
        riskLevel: "Critical"
      }
    ]
  },
  {
    id: "fire-drill-2",
    title: "Extinguisher Selection: Electrical Server Rack",
    situation: "Smoke and small flames are coming from an energized computer power supply and server rack in the school lab.",
    context: "Fire Class & Agent Selection",
    environment: "Computer Lab",
    options: [
      {
        id: "f-opt-2a",
        text: "Grab a pressurized water extinguisher and spray it directly into the back of the live power supply.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Water conducts electricity! Spraying water on energized equipment causes electrocution back to the operator.",
        riskLevel: "Critical"
      },
      {
        id: "f-opt-2b",
        text: "Select a CO2 (Carbon Dioxide) or ABC Dry Chemical powder extinguisher labeled safe for electrical fires, and cut main power if safely possible.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Correct! CO2 and Dry Chemical are non-conductive and safely suffocate electrical fires without conducting electric shock.",
        riskLevel: "Low"
      }
    ]
  },
  {
    id: "fire-drill-3",
    title: "Executing the P.A.S.S. Method",
    situation: "You are holding an ABC extinguisher 7 feet from the base of the fire. What is the correct sequence of physical actions?",
    context: "Operational Mechanics (PASS)",
    environment: "Corridor",
    options: [
      {
        id: "f-opt-3a",
        text: "Pull the safety pin → Aim low at the base of the flames → Squeeze the lever → Sweep side-to-side across the base.",
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Spot on! P.A.S.S. is Pull pin, Aim low at fuel base, Squeeze lever steadily, and Sweep side-to-side across the burning fuel.",
        riskLevel: "Low"
      },
      {
        id: "f-opt-3b",
        text: "Squeeze the handle with the pin in → Aim at the top smoke → Shake cylinder vigorously → Drop it on the fire.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "The pin prevents the lever from squeezing. Aiming at top smoke wastes chemical agent without smothering the fuel source.",
        riskLevel: "High"
      }
    ]
  },
  {
    id: "fire-drill-4",
    title: "Flames Reach the Ceiling",
    situation: "While discharging, a gust of wind from a window blows flames up into window blinds and the ceiling acoustic tiles. The room is rapidly filling with thick black smoke.",
    context: "Knowing When to Stop and Evacuate",
    environment: "Room",
    options: [
      {
        id: "f-opt-4a",
        text: "Immediately stop firefighting, drop the spent extinguisher, evacuate through your exit, close the door behind you, and leave the building.",
        isBest: true,
        isAppropriate: true,
        actionFeedback: "✓ Appropriate decision",
        explanation: "Never stay in a growing fire! Once flames spread to structural elements or smoke thickens, evacuation is the only safe choice.",
        riskLevel: "Low"
      },
      {
        id: "f-opt-4b",
        text: "Run deeper into the room to find a second fire extinguisher while holding your breath.",
        isAppropriate: false,
        actionFeedback: "✕ Unsafe decision",
        explanation: "Searching for extinguishers in dense smoke causes disorientation, toxic gas asphyxiation, and death in under 2 minutes.",
        riskLevel: "Critical"
      }
    ]
  }
];

export const FIRE_SCENARIOS: CourseScenario[] = [
  {
    id: "fire-scen-home",
    environment: "Home",
    locationTag: "Residential Kitchen",
    title: "Cooking Oil Pan Catches Fire on Stove",
    situation: "You are frying food when cooking oil overheats and erupts into high yellow flames inside the metal frying pan. Smoke is billowing to the ceiling.",
    dilemma: "A cup of water is sitting right next to the sink. What do you do?",
    decisions: [
      {
        id: "f-dec-1",
        text: "Turn off the stove burner heat source, slide a flat metal lid or baking sheet smoothly over the pan from the front to starve it of oxygen, and leave it covered until completely cool.",
        isBest: true,
        outcome: "The fire is suffocated safely without splashing. Zero injuries occur.",
        safetyTakeaway: "Smothering grease fires with a metal lid prevents oxygen flow. Never move the burning hot pan."
      },
      {
        id: "f-dec-2",
        text: "Throw the cup of tap water into the burning oil pan to put out the flames.",
        isBest: false,
        outcome: "Water instantly vaporizes into a massive steam fireball, throwing burning boiling oil across the kitchen and causing 3rd-degree burns.",
        safetyTakeaway: "NEVER throw water on a grease/oil fire! It causes an explosive steam fireball."
      }
    ]
  },
  {
    id: "fire-scen-school",
    environment: "School",
    locationTag: "Multi-Story Academic Wing",
    title: "Smoke in the 3rd Floor Stairwell",
    situation: "The school fire alarm sounds. You exit your 3rd-floor classroom and proceed to the designated stairwell, but opening the door reveals heavy gray smoke rising up the stairs.",
    dilemma: "Should you push through the smoke to reach the ground floor quickly?",
    decisions: [
      {
        id: "f-dec-1",
        text: "Immediately close the smoke-filled stairwell door. Direct classmates to the secondary alternate fire exit stairwell on the east wing.",
        isBest: true,
        outcome: "Students avoid lethal toxic gas inhalation and evacuate safely via the uncompromised secondary stairwell.",
        safetyTakeaway: "Never enter a smoke-filled stairwell. Chimney effect carries high concentrations of toxic gas up stairwells."
      },
      {
        id: "f-dec-2",
        text: "Hold your breath, run down the smoke-filled stairwell, and take the elevator if you get tired.",
        isBest: false,
        outcome: "Running in dense smoke causes disorientation and falls. Taking elevators during fires can trap you in a burning shaft.",
        safetyTakeaway: "Never use elevators during fires. Always utilize clear, smoke-free alternate stairwells."
      }
    ]
  },
  {
    id: "fire-scen-workplace",
    environment: "Workplace",
    locationTag: "Warehouse / Assembly Floor",
    title: "Cardboard Packaging Fire near Emergency Exit",
    situation: "A stack of cardboard boxes near the warehouse exit begins to burn. You have a 9kg ABC dry chemical extinguisher, and the outdoor assembly area is right through that door.",
    dilemma: "The exit door is 10 feet past the flames.",
    decisions: [
      {
        id: "f-dec-1",
        text: "Sound the alarm, pull the pin on the extinguisher, aim low at the base, and discharge while maintaining a safe 6-8 foot distance, keeping your sightline clear to the door.",
        isBest: true,
        outcome: "The dry chemical agent knocks down the incipient surface fire, keeping the exit clear for workers.",
        safetyTakeaway: "Early suppression of small fires keeps critical building escape routes open."
      },
      {
        id: "f-dec-2",
        text: "Try to jump over the burning cardboard boxes to escape outside alone without warning anyone else.",
        isBest: false,
        outcome: "Jumping over flames risks catching clothes on fire and leaves coworkers unaware of the growing fire behind them.",
        safetyTakeaway: "Always raise the building alarm first before attempting any other action."
      }
    ]
  }
];

export const FIRE_ASSESSMENT: AssessmentQuestion[] = [
  {
    id: "fire-q1",
    question: "In the P.A.S.S. fire extinguisher acronym, what does each letter stand for?",
    type: "mcq",
    options: [
      "Press, Aim, Shake, Stop",
      "Pull the pin, Aim at the base, Squeeze the lever, Sweep side-to-side",
      "Point, Alert, Spray, Step back",
      "Protect, Assess, Secure, Shield"
    ],
    correctAnswerIndex: 1,
    explanation: "P.A.S.S. stands for Pull the pin, Aim low at the base of the fire, Squeeze the handle, and Sweep side-to-side.",
    domainArea: "PASS Method"
  },
  {
    id: "fire-q2",
    question: "Why should you NEVER throw water onto a cooking oil or kitchen grease fire?",
    type: "scenario",
    options: [
      "Water makes the oil smell bad",
      "Water sinks under hot oil, boils violently into steam, and blasts flaming oil droplets into a massive fireball",
      "Water cools the grease too quickly, breaking the pan",
      "Water turns into electricity"
    ],
    correctAnswerIndex: 1,
    explanation: "Water is denser than oil. It sinks to the bottom of the scorching pan and instantly flashes to steam, violently spraying burning oil droplets across the room.",
    domainArea: "Kitchen Grease Fires"
  },
  {
    id: "fire-q3",
    question: "When should you NOT attempt to use a portable fire extinguisher?",
    type: "decision",
    options: [
      "When the fire is taller than you or spreading rapidly",
      "When smoke is filling the room and reducing visibility",
      "When you do not have an unblocked exit route at your back",
      "All of the above"
    ],
    correctAnswerIndex: 3,
    explanation: "All of the above conditions mean life safety is compromised. You must evacuate immediately, close doors, and leave firefighting to professionals.",
    domainArea: "Evacuation Criteria"
  },
  {
    id: "fire-q4",
    question: "Which type of fire extinguisher is safe and recommended for live electrical equipment fires?",
    type: "mcq",
    options: [
      "Plain Water extinguisher",
      "CO2 (Carbon Dioxide) or ABC Dry Chemical Powder",
      "Aqueous Foam (AFFF)",
      "Buckets of salt water"
    ],
    correctAnswerIndex: 1,
    explanation: "CO2 and ABC Dry Chemical are electrically non-conductive, protecting the operator from electrical shocks while suppressing flames.",
    domainArea: "Extinguisher Types"
  },
  {
    id: "fire-q5",
    question: "Approximately how long does a standard portable 5kg fire extinguisher discharge before it is completely empty?",
    type: "mcq",
    options: [
      "10 to 15 seconds",
      "5 to 10 minutes",
      "30 minutes",
      "It discharges indefinitely until plugged"
    ],
    correctAnswerIndex: 0,
    explanation: "Standard portable extinguishers discharge their entire contents in just 10 to 15 seconds. Every second must be used effectively by aiming at the base before squeezing.",
    domainArea: "Extinguisher Discharge Duration"
  }
];
