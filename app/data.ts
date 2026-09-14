export const projectCategories = [
  "Products & Tools",
  "Interactive Experiences",
  "Data & Research",
  "Critical Design",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  intro: string;
  summary: string;
  tags: string[];
  cover: string;
  gallery: string[];
  featured?: boolean;
  role: string;
  tools: string;
  archiveUrl?: string;
  links?: {
    label: string;
    url: string;
  }[];
  sections: {
    eyebrow: string;
    title: string;
    body: string[];
  }[];
};

export const projects: Project[] = [
  {
    slug: "warren-for-vs-code",
    title: "Warren for VS Code",
    category: "Products & Tools",
    year: "2026",
    intro: "All your coding agents, at a glance.",
    summary:
      "An always-on-top desktop companion that brings real Claude, Codex, and OpenCode sessions from every VS Code window into one calm attention layer.",
    tags: ["Developer tool", "Multi-agent workflows", "VS Code"],
    cover: "/media/warren/cover.png",
    gallery: [
      "/media/warren/app.png",
      "/media/warren/icon.png",
    ],
    role: "Product designer · Developer",
    tools: "TypeScript · VS Code API · Electron · Agent lifecycle hooks",
    links: [
      {
        label: "Project website",
        url: "https://hqselene.github.io/Warren-for-VS-Code/",
      },
      {
        label: "GitHub repository",
        url: "https://github.com/HqSelene/Warren-for-VS-Code",
      },
    ],
    sections: [
      {
        eyebrow: "Problem",
        title: "Agentic coding creates an attention problem",
        body: [
          "Running several coding agents across different workspaces changes the bottleneck from doing every task manually to noticing which session needs attention. Permission requests, completed turns, and failures are easy to miss when they are scattered across windows and terminals.",
          "Warren was designed as a small, persistent attention layer: visible enough to keep parallel work legible without becoming another full-size dashboard competing for focus.",
        ],
      },
      {
        eyebrow: "Product",
        title: "One calm view across every workspace",
        body: [
          "The always-on-top companion groups live agents by VS Code workspace and translates their lifecycle signals into four clear states: Working, Needs You, Done, and Error.",
          "Each card shows a concise preview of the current task. Selecting it returns directly to the originating VS Code window and terminal, while a compact draggable mode keeps the overall status visible when screen space is limited.",
        ],
      },
      {
        eyebrow: "System",
        title: "Local signals, not stored conversations",
        body: [
          "A VS Code bridge, Electron companion, and dedicated Claude, Codex, and OpenCode adapters communicate through an in-memory HTTP broker bound to 127.0.0.1.",
          "The system uses real lifecycle hooks rather than guessing from terminal output, and does not persist full prompts, responses, source code, tool inputs, credentials, or terminal content.",
        ],
      },
    ],
  },
  {
    slug: "fitness-tracker",
    title: "FitnessTracker",
    category: "Products & Tools",
    year: "2026",
    featured: true,
    intro: "A future self, made tangible.",
    summary:
      "An experimental platform exploring how AI-generated self-modeling can support motivation and long-term behavior change in fitness.",
    tags: ["HCI", "Behavior change", "AI self-modeling"],
    cover: "/media/fitness-tracker/cover.png",
    gallery: [
      "/media/fitness-tracker/interface.png",
      "/media/fitness-tracker/reflection.png",
      "/media/fitness-tracker/progress.png",
    ],
    role: "Researcher · Product designer · Developer",
    tools: "AI video generation · Web prototyping · User research",
    archiveUrl: "https://hqselene.github.io/post/e6c57899/",
    sections: [
      {
        eyebrow: "Question",
        title: "Can a visualized future self change what we do today?",
        body: [
          "FitnessTracker investigates the gap between abstract fitness goals and the daily actions needed to reach them. Instead of relying only on numbers, streaks, or reminders, the experience gives each person a vivid representation of a possible future body.",
          "The project treats AI-generated imagery as a behavioral interface: personal enough to feel relevant, but lightweight enough to live inside an everyday tracking routine.",
        ],
      },
      {
        eyebrow: "System",
        title: "From aspiration to reflection",
        body: [
          "People choose an ideal body direction, generate a personalized future-self video, and connect that image to a simple loop of tracking and reflection.",
          "The prototype was designed as an early research instrument. It helped surface questions about motivation, perception, novelty effects, and whether personalized nudges remain meaningful over time.",
        ],
      },
    ],
  },
  {
    slug: "sounds-up",
    title: "SoundsUp",
    category: "Products & Tools",
    year: "2025",
    featured: true,
    intro: "Let every live rhythm echo once more.",
    summary:
      "A memory companion for live music that turns emotion, media, and context into personal digital tickets.",
    tags: ["Product design", "AI generation", "Emotion analysis"],
    cover: "/media/sounds-up/cover.png",
    gallery: [
      "/media/sounds-up/home.png",
      "/media/sounds-up/tickets.png",
      "/media/sounds-up/emotion.png",
      "/media/sounds-up/ticket-list.png",
    ],
    role: "Product designer · Prototyper",
    tools: "Experience design · Generative AI · Mobile interface",
    archiveUrl: "https://hqselene.github.io/post/f7bfe8b6/",
    sections: [
      {
        eyebrow: "Opportunity",
        title: "Concert memories deserve more than a camera roll",
        body: [
          "The emotional texture of a live performance is difficult to preserve. Photos capture a scene, but often lose the sound, context, anticipation, and feeling that made the moment important.",
          "SoundsUp reframes the ticket as a living memory object that grows from the traces people already create before, during, and after a show.",
        ],
      },
      {
        eyebrow: "Experience",
        title: "A collection shaped by feeling",
        body: [
          "The app gathers lightweight signals, analyzes the emotional character of a memory, and generates a visual ticket that can be collected over time.",
          "The result is not another social feed. It is a private archive of performances—organized around personal meaning rather than engagement metrics.",
        ],
      },
    ],
  },
  {
    slug: "emotion-clock",
    title: "Emotion “Clock”",
    category: "Interactive Experiences",
    year: "2025",
    featured: true,
    intro: "Making collective interpretation visible.",
    summary:
      "A participatory museum system that lets visitors build and see a shared understanding of an exhibit in real time.",
    tags: ["Interaction design", "Participatory systems", "Physical computing"],
    cover: "/media/emotion-clock/cover.jpg",
    gallery: [
      "/media/emotion-clock/device.png",
      "/media/emotion-clock/journey.png",
      "/media/emotion-clock/clock.png",
      "/media/emotion-clock/color-wheel.png",
      "/media/emotion-clock/data-workflow.png",
      "/media/emotion-clock/device-02.png",
      "/media/emotion-clock/device-03.png",
      "/media/emotion-clock/museum.png",
    ],
    role: "Interaction designer · System designer",
    tools: "App + hardware integration · Data visualization",
    archiveUrl: "https://hqselene.github.io/post/62474477/",
    sections: [
      {
        eyebrow: "Concept",
        title: "A clock for accumulated perception",
        body: [
          "A clock turns an invisible social agreement—time—into something measurable. This project asks whether knowledge and interpretation inside an exhibition can become visible in a similar way.",
          "Visitors respond to prompts as they move through the museum. Their individual perspectives are aggregated into a shared visualization that changes with every contribution.",
        ],
      },
      {
        eyebrow: "Design",
        title: "The audience becomes part of the exhibition",
        body: [
          "The system combines a visitor interface, a physical display panel, and a real-time aggregation layer. Instead of delivering a single authoritative reading, the museum reveals how different readings coexist.",
          "The model can extend beyond museums to schools, public buildings, heritage sites, and other places where knowledge is negotiated collectively.",
        ],
      },
    ],
  },
  {
    slug: "leap-of-faith",
    title: "LEAP OF “FAITH”",
    category: "Critical Design",
    year: "2025",
    featured: true,
    intro: "A speculative world split between reality and the virtual.",
    summary:
      "A science-fiction narrative and visual system examining identity, control, and belief in a society shaped by virtual life.",
    tags: ["Speculative design", "Comic art", "Worldbuilding"],
    cover: "/media/leap-of-faith/cover.jpg",
    gallery: [
      "/media/leap-of-faith/story-00.jpg",
      "/media/leap-of-faith/story-01.jpg",
      "/media/leap-of-faith/story-02.jpg",
      "/media/leap-of-faith/story-03.jpg",
      "/media/leap-of-faith/story-05.jpg",
      "/media/leap-of-faith/story-06.jpg",
    ],
    role: "Author · Visual designer",
    tools: "Narrative design · Illustration · Graphic systems",
    archiveUrl: "https://hqselene.github.io/post/f8ad34ee/",
    sections: [
      {
        eyebrow: "Premise",
        title: "When the virtual world feels more real than reality",
        body: [
          "Fifty years into a networked future, people begin to experience Reality–Virtual Confusion Irritability Syndrome. What society calls a disorder is reframed by a political movement as the next step in human evolution.",
          "The project uses fiction to explore a familiar tension: who gets to define normality when technology changes the boundaries of identity and experience?",
        ],
      },
      {
        eyebrow: "Artifact",
        title: "Storytelling as a design method",
        body: [
          "Panels, symbols, propaganda, and character perspectives form a speculative communication system for the imagined “New Humans.”",
          "Rather than predicting one future, the work creates a world through which present-day anxieties about immersion, governance, and belonging can be examined.",
        ],
      },
    ],
  },
  {
    slug: "dont-touch",
    title: "Don’t Touch",
    category: "Critical Design",
    year: "2025",
    intro: "An architecture that questions institutional authority.",
    summary:
      "A museum extension proposal that challenges the distance between public knowledge, cultural authority, and the people museums claim to serve.",
    tags: ["Architecture", "Museum extension", "Transparency"],
    cover: "/media/dont-touch/cover.png",
    gallery: [
      "/media/dont-touch/exterior.png",
      "/media/dont-touch/model.jpg",
      "/media/dont-touch/model-01.png",
      "/media/dont-touch/model-04.jpg",
      "/media/dont-touch/section.png",
    ],
    role: "Architectural designer",
    tools: "Spatial research · Modeling · Representation",
    archiveUrl: "https://hqselene.github.io/post/a436b1e0/",
    sections: [
      {
        eyebrow: "Critique",
        title: "The invisible barrier around knowledge",
        body: [
          "Museums present themselves as open institutions, yet their spatial structure and display logic often reinforce authority. Objects are visible but untouchable; knowledge is public but tightly mediated.",
          "Don’t Touch begins with this contradiction and asks how an extension could make the institution’s boundaries legible rather than natural or inevitable.",
        ],
      },
      {
        eyebrow: "Proposal",
        title: "Transparency as spatial argument",
        body: [
          "The design exposes circulation, storage, production, and viewing as overlapping systems. Transparency is used not as a visual style, but as a way to reveal who can access what—and under which conditions.",
          "The project turns architecture into a public question about ownership, participation, and the social role of the museum.",
        ],
      },
    ],
  },
  {
    slug: "emotion-space",
    title: "Emotion Space Self-Construction",
    category: "Critical Design",
    year: "2023",
    intro: "Building room for emotions that have nowhere to go.",
    summary:
      "A game, performance, and spatial theory responding to the lack of private emotional space in dense institutional environments.",
    tags: ["Game design", "Performance", "Installation"],
    cover: "/media/emotion-space/cover.png",
    gallery: [],
    role: "Independent artist · Game designer",
    tools: "Unity · Performance · Spatial storytelling",
    archiveUrl: "https://hqselene.github.io/post/ace1c5d2/",
    sections: [
      {
        eyebrow: "Observation",
        title: "Privacy is also an emotional resource",
        body: [
          "In many university environments, students have few places to be alone. Negative emotions are pushed inward because there is no physical or social room in which to process them.",
          "This project proposes emotional space as something that can be actively constructed—an extension of private space rather than a fixed room.",
        ],
      },
      {
        eyebrow: "Forms",
        title: "One idea, two embodied experiences",
        body: [
          "The Unity game Contend For Room turns the search for private space into an interactive struggle. The performance Emotional “Monster” makes suppressed feeling visible through the body.",
          "Together, the works test how play, performance, and spatial metaphor can help people encounter emotions without reducing them to a diagnosis.",
        ],
      },
    ],
  },
  {
    slug: "musical-influence",
    title: "Musical Influence as a Directed Network",
    category: "Data & Research",
    year: "2021",
    intro: "Who shapes the sound of an era?",
    summary:
      "A mathematical framework tracing influence across more than 5,600 musicians through graphs, acoustic features, and dynamic analysis.",
    tags: ["Network science", "PageRank", "Data storytelling"],
    cover: "/media/musical-influence/cover.png",
    gallery: [
      "/media/musical-influence/timeline.png",
      "/media/musical-influence/ranking.png",
      "/media/musical-influence/event.png",
      "/media/musical-influence/influence.png",
      "/media/musical-influence/similarity.png",
    ],
    role: "Modeling · Analysis · Visualization",
    tools: "Python · NetworkX · scikit-learn · Pandas",
    archiveUrl: "https://hqselene.github.io/post/ee35e70c/",
    sections: [
      {
        eyebrow: "Recognition",
        title: "Finalist · 2021 MCM/ICM",
        body: [
          "Most histories of musical influence are narrative. This project treats relationships between musicians as a directed graph, where each edge records influence and each artist carries an acoustic feature profile.",
          "The work combines network topology with musical similarity to move from anecdote toward a reproducible model of how styles travel.",
        ],
      },
      {
        eyebrow: "Method",
        title: "Four models, one evolving network",
        body: [
          "Modified PageRank, entropy-weighted similarity, influence propagation, and temporal analysis are chained together so that each model informs the next.",
          "The resulting system surfaces influential artists, detects stylistic communities, and shows how musical characteristics move across genres and generations.",
        ],
      },
    ],
  },
  {
    slug: "aid-sync",
    title: "Aid-Sync",
    category: "Data & Research",
    year: "2025",
    intro: "Designing a mutual-aid information ecosystem.",
    summary:
      "A crisis-response platform concept that organizes public posts, verifies urgent needs, and connects distributed online participation with on-site rescue.",
    tags: ["Civic technology", "NLP", "Information systems"],
    cover: "/media/aid-sync/cover.jpg",
    gallery: [
      "/media/aid-sync/system.png",
      "/media/aid-sync/demo.png",
      "/media/aid-sync/demo-02.png",
      "/media/aid-sync/mutual-aid.png",
      "/media/aid-sync/distribution.png",
      "/media/aid-sync/process.png",
    ],
    role: "Researcher · Information designer",
    tools: "Data analysis · System mapping · Web design",
    archiveUrl: "https://hqselene.github.io/post/9952378d/",
    sections: [
      {
        eyebrow: "Context",
        title: "Public participation is powerful—and hard to coordinate",
        body: [
          "During large-scale emergencies, social media can connect needs, resources, and volunteers faster than centralized systems alone. It can also create duplication, noise, unverifiable claims, and rapidly outdated information.",
          "Aid-Sync studies this tension through recent public crises and frames citizen participation as part of a mutual-aid ecosystem.",
        ],
      },
      {
        eyebrow: "System",
        title: "Turning fragmented posts into actionable signals",
        body: [
          "The concept clusters and structures rescue-related posts, supports verification and status updates, and maps information flows between online participants and official response.",
          "The goal is not to replace institutional rescue, but to create a clearer interface between distributed public energy and coordinated action.",
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
