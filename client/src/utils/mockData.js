export const MOCK_REEFS = [
  {
    id: "reef-01",
    name: "Great Barrier Guardian Sector Alpha",
    coordinates: [-18.2871, 147.6992],
    region: "Coral Sea, Australia",
    healthIndex: 78,
    restorationProgress: 82,
    volunteerCount: 1420,
    temperature: "27.4°C",
    depth: "12m",
    status: "ACTIVE_RESTORATION",
    threatLevel: "MODERATE",
    comicBadge: "HEROIC SQUAD",
    speechBubble: "Super-coral polyps are flourishing here! 82% restored!",
    linkedPaperIds: ["paper-01", "paper-02"]
  },
  {
    id: "reef-02",
    name: "Mesoamerican Super-Reef Vanguard",
    coordinates: [16.4897, -86.5269],
    region: "Caribbean Coast, Honduras",
    healthIndex: 64,
    restorationProgress: 69,
    volunteerCount: 980,
    temperature: "29.1°C",
    depth: "18m",
    status: "MONITORED",
    threatLevel: "HIGH",
    comicBadge: "HIGH ALERT",
    speechBubble: "Heatwave detected! Deploy thermal-tolerant nursery frames!",
    linkedPaperIds: ["paper-01"]
  },
  {
    id: "reef-03",
    name: "Coral Triangle Megadiversity Haven",
    coordinates: [-2.5000, 131.0000],
    region: "Raja Ampat, Indonesia",
    healthIndex: 91,
    restorationProgress: 95,
    volunteerCount: 2350,
    temperature: "26.8°C",
    depth: "8m",
    status: "PRISTINE_PROTECTED",
    threatLevel: "LOW",
    comicBadge: "KABOOM CHAMPION",
    speechBubble: "91% Health Score! Biodiversity explosion in progress!",
    linkedPaperIds: ["paper-02"]
  },
  {
    id: "reef-04",
    name: "Red Sea Heat-Resilient Trench",
    coordinates: [22.0000, 38.0000],
    region: "Red Sea Basin",
    healthIndex: 85,
    restorationProgress: 78,
    volunteerCount: 640,
    temperature: "30.5°C",
    depth: "24m",
    status: "GENETIC_RESEARCH",
    threatLevel: "LOW",
    comicBadge: "GENE SHIELD",
    speechBubble: "Thermally immune symbionts identified by global squad!",
    linkedPaperIds: ["paper-01"]
  }
];

export const MOCK_PAPERS = [
  {
    id: "paper-01",
    title: "Cryopreservation & Micro-fragmentation in Super-Coral Nursery Networks",
    authors: ["Dr. Maya Lin", "Prof. Arthur Thorne", "Reef Guardian Collective"],
    journal: "Journal of Marine Biotechnology & Antigravity Science",
    year: 2026,
    doi: "10.1016/j.marbio.2026.04.012",
    abstract: "Using high-frequency acoustic levitation and thermal-stress pre-conditioning, super-coral fragments exhibited 400% accelerated calcification rates across Pacific monitoring sectors.",
    tags: ["Coral Restoration", "Super-Corals", "Micro-fragmentation"],
    comicSummary: "KABOOM breakthrough! Sonic soundwaves speed up coral growth by 4x!",
    downloads: 4210
  },
  {
    id: "paper-02",
    title: "3D Hydrodynamic Vector Modeling of Deep-Sea Microplastic Transport",
    authors: ["Dr. Elena Rostova", "Kai Takahashi"],
    journal: "Oceanic Fluid Dynamics Quarterly",
    year: 2026,
    doi: "10.1038/s41586-026-0881-x",
    abstract: "Coupling satellite altimetry with submerged autonomous drifters reveals sub-surface current corridors trapping 80% of marine polymers within designated ocean trenches.",
    tags: ["Plastic Currents", "Fluid Dynamics", "Deep Sea"],
    comicSummary: "DEEP DIVE ALERT! Microplastics trapped in underwater current highways!",
    downloads: 3150
  }
];

export const MOCK_TOPICS = [
  {
    id: 1,
    title: "Plastic Pollution: Deep Sea Current Analysis & Polymer Trajectory",
    category: "PLASTIC_CURRENTS",
    author_name: "Oceania Explorer",
    author_avatar: "🌊",
    content: "Our drifter sensors show abyssal currents concentrating plastic micro-debris in Mariana Sector 4. Activate the 3D Deep-Sea Current Mode below to inspect vector trajectories!",
    visual_mode: "DEEP_SEA_PLASTIC_CURRENT",
    likes: 142,
    created_at: "2026-07-24T02:00:00Z",
    comments: [
      {
        id: 101,
        topic_id: 1,
        author_name: "Dr. Elena",
        author_badge: "CHIEF SCIENTIST",
        content: "Confirmed! The 3D particle current visualization reproduces the abyssal drift perfectly.",
        created_at: "2026-07-24T03:15:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Super-Coral Nursery Deployment in Sector Alpha",
    category: "CORAL_GENETICS",
    author_name: "Captain Coral",
    author_avatar: "🪸",
    content: "Calling all volunteer divers! Micro-fragmentation nursery frames are ready for deployment on Friday.",
    visual_mode: "SURFACE_OCEAN",
    likes: 98,
    created_at: "2026-07-23T18:30:00Z",
    comments: []
  }
];

export const STORY_CHAPTERS = [
  {
    chapter: 1,
    title: "ISSUE #1: THE CORAL CRISIS",
    headline: "OCEAN TEMPERATURES RISING!",
    panelImage: "🪸⚡",
    narrative: "In the year 2026, marine heatwaves threaten 75% of global coral reefs. But from the depths of the Antigravity IDE emerges the REEF GUARDIAN SQUAD!",
    callout: "DEPLOY SUPER-CORAL FRAGMENTS NOW!",
    badge: "MISSION START"
  },
  {
    chapter: 2,
    title: "ISSUE #2: ACOUSTIC REGENERATION",
    headline: "SONIC WAVES HEAL POLYPS!",
    panelImage: "🔊✨",
    narrative: "Using micro-fragmentation and 3D acoustic resonance, scientists accelerate polyp calcification rates by 400%, building heat-tolerant Super-Reefs!",
    callout: "BOOM! CALCIFICATION RATE x4!",
    badge: "SCIENTIFIC BREAKTHROUGH"
  },
  {
    chapter: 3,
    title: "ISSUE #3: THE DEEP-SEA PLASTIC DRIFT",
    headline: "ABYSSAL CURRENTS UNCOVERED!",
    panelImage: "🌊🤖",
    narrative: "3D hydrodynamic drifters isolate plastic accumulation corridors deep within ocean trenches, enabling precise robot cleanup deployments!",
    callout: "CLEANUP SQUAD ENGAGED!",
    badge: "VICTORY IN SIGHT"
  }
];
