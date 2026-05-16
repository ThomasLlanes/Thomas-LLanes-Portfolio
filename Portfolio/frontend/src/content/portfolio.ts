export type NavSection = "about" | "projects" | "notes";

export type ContactLink = {
  label: string;
  url: string;
  placeholder?: boolean;
  downloadFilename?: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  linkedIn: string;
  summary: string;
  currentWork: string;
  education: string;
  previousExperience: string;
  languages: string[];
  strengths: string[];
  contactLinks: ContactLink[];
};

export type Project = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  technologies: string[];
  keyFeatures: string[];
  architectureNotes: string[];
  media: {
    type: "video";
    url: string;
    altText: string;
    posterImage?: string;
    placeholder: boolean;
  };
  links: ContactLink[];
  featured: boolean;
};

export type EngineeringNote = {
  title: string;
  slug: string;
  theme: string;
  summary: string;
  problem: string;
  investigation: string;
  solution: string;
  technologies: string[];
  highlights: string[];
};

export const profile: Profile = {
  name: "Thomas Llanes",
  role: "Software Developer focused on scalable backend systems, iOS experiences, and product-minded engineering.",
  location: "Montevideo, Uruguay",
  email: "thomas.llanes22@gmail.com",
  linkedIn: "https://www.linkedin.com/in/thomas-llanes2202001",
  summary:
    "Backend-oriented Software Developer with iOS frontend experience, currently building at Codigo del Sur while studying Computer Engineering at Universidad de la Republica. Thomas is drawn to the point where product behavior, API contracts, data flow, and deployment reality meet. He likes understanding why a system behaves incorrectly, not just patching the visible symptom.",
  currentWork:
    "Software Developer at Codigo del Sur, focused on backend services and SwiftUI iOS experiences.",
  education:
    "Computer Engineering student at Universidad de la Republica (Udelar).",
  previousExperience:
    "Previously Technical Support Technician at ORT University, supporting hardware, user workflows, and Moodle LMS systems.",
  languages: [
    "Spanish native",
    "English advanced",
    "Cambridge CAE",
    "Cambridge FCE",
  ],
  strengths: [
    "Node.js, NestJS, PostgreSQL, and REST API design",
    "SwiftUI, MVVM, async flows, and reusable iOS UI components",
    "Authentication systems and OTP delivery through SMS and email",
    "AWS Elastic Beanstalk, RDS, Route 53, ACM, and GitHub Actions CI/CD",
    "OpenAI API, Twilio, transactional email, and third-party integration work",
    "API contract validation, backend/frontend coordination, and distributed debugging",
    "AI-assisted development for learning, debugging, communication, and architecture exploration",
  ],
  contactLinks: [
    { label: "Email", url: "mailto:thomas.llanes22@gmail.com" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/thomas-llanes2202001",
    },
    { label: "GitHub", url: "https://github.com/ThomasLlanes" },
    {
      label: "Resume",
      url: "/Thomas_LLanes_CV.pdf",
      downloadFilename: "Thomas_LLanes_CV.pdf",
    },
  ],
};

export const projects: Project[] = [
  {
    title: "PokeBrowser",
    slug: "pokemon-ios-app",
    description:
      "A SwiftUI iOS app for browsing Pokemon and berry data from the public PokeAPI.",
    longDescription:
      "PokeBrowser is a native iOS app built with SwiftUI and MVVM to explore API-backed mobile behavior. The app presents Pokemon, berries, detail screens, favorites, search, loading states, and local cache support while keeping UI state, service boundaries, and network access clearly separated.",
    technologies: [
      "SwiftUI",
      "iOS",
      "Xcode",
      "MVVM",
      "Swift Concurrency",
      "REST APIs",
      "Codable",
      "Local caching",
    ],
    keyFeatures: [
      "Pokemon browsing with searchable list results and sprite-backed detail views",
      "Berry browsing with structured detail screens for growth, harvest, firmness, and flavor data",
      "Favorites flow shared across list, detail, and favorites screens",
      "Async loading, empty, search, refresh, and error states handled as part of the UI experience",
      "Local list caching so previously fetched data remains available when network calls fail",
    ],
    architectureNotes: [
      "SwiftUI views stay focused on presentation while view models coordinate search, loading, cache, and error state.",
      "PokemonService and BerryService sit behind protocols, which keeps data fetching replaceable and easier to test.",
      "A reusable APIClient, typed APIEndpoint definitions, and Codable models isolate PokeAPI contract details from the UI.",
      "A network logger records request URLs, response status codes, payload sizes, decode types, durations, and failures for easier debugging.",
    ],
    media: {
      type: "video",
      url: "/media/PokeBrowser_Portfolio_Voiceover.mp4",
      altText: "PokeBrowser iOS app video demo",
      placeholder: false,
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ThomasLlanes/PokeBrowserIOSApp",
      },
      {
        label: "Video",
        url: "/media/PokeBrowser_Portfolio_Voiceover.mp4",
      },
    ],
    featured: true,
  },
];

export const engineeringNotes: EngineeringNote[] = [
  {
    title: "REST API Design",
    slug: "rest-api-design",
    theme: "Contracts",
    summary:
      "Designing endpoints around clear product behavior, predictable validation, and stable client expectations.",
    problem:
      "Small API ambiguities quickly become frontend conditionals, support issues, and unclear product behavior.",
    investigation:
      "Trace request shape, validation rules, response states, error semantics, and how mobile/web clients consume them.",
    solution:
      "Prefer explicit DTOs, consistent response contracts, and API states that describe what the product needs the user to understand.",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "REST"],
    highlights: [
      "DTO-first thinking",
      "Validation boundaries",
      "Error semantics",
    ],
  },
  {
    title: "OTP Authentication via SMS and Email",
    slug: "otp-authentication",
    theme: "Authentication",
    summary:
      "Building login flows that balance reliability, delivery constraints, rate limits, and user feedback.",
    problem:
      "OTP flows fail in ways that look simple to users but involve delivery providers, expiration, retries, and abuse controls.",
    investigation:
      "Review code generation, storage, provider responses, retry windows, expiration behavior, and frontend copy for failed attempts.",
    solution:
      "Model the flow as states: requested, delivered, expired, verified, failed, and rate-limited, then make each state observable.",
    technologies: ["NestJS", "Twilio", "Transactional email", "Authentication"],
    highlights: [
      "Stateful auth behavior",
      "Provider failure handling",
      "User-visible correctness",
    ],
  },
  {
    title: "Backend and Frontend API Contract Validation",
    slug: "api-contract-validation",
    theme: "Coordination",
    summary:
      "Reducing integration surprises by making API expectations explicit before they become runtime bugs.",
    problem:
      "A backend can be technically correct while still surprising the client through nullability, naming, sorting, or missing metadata.",
    investigation:
      "Compare DTOs, client models, fixture data, edge responses, and the UI states that depend on them.",
    solution:
      "Keep contracts typed, document edge cases, validate payload shape early, and test representative responses.",
    technologies: ["TypeScript", "Swift", "DTOs", "API clients"],
    highlights: [
      "Contract drift detection",
      "Typed payloads",
      "Frontend/backend alignment",
    ],
  },
  {
    title: "AWS Deployment Workflow",
    slug: "aws-deployment-workflow",
    theme: "Cloud",
    summary:
      "A practical deployment path using Elastic Beanstalk, RDS, Route 53, ACM, and environment-aware configuration.",
    problem:
      "Deployment bugs often hide in configuration, DNS, certificates, environment variables, or database connectivity.",
    investigation:
      "Inspect app health, logs, security groups, certificate status, DNS propagation, and runtime environment values.",
    solution:
      "Treat deployment as a system: app runtime, database, network boundaries, secrets, domains, certificates, and rollback paths.",
    technologies: ["AWS Elastic Beanstalk", "RDS", "Route 53", "ACM"],
    highlights: [
      "Cloud debugging",
      "Runtime configuration",
      "Operational awareness",
    ],
  },
  {
    title: "GitHub Actions CI/CD",
    slug: "github-actions-cicd",
    theme: "Delivery",
    summary:
      "Automating checks and deployments so correctness is reinforced before changes reach production.",
    problem:
      "Manual deployment habits make releases fragile and hard to reason about under pressure.",
    investigation:
      "Identify build steps, environment secrets, test commands, deployment triggers, and failure reporting.",
    solution:
      "Use focused workflows for validation and deployment, with clear logs and environment-specific settings.",
    technologies: ["GitHub Actions", "TypeScript", "AWS"],
    highlights: [
      "Repeatable releases",
      "Automated checks",
      "Deployment visibility",
    ],
  },
  {
    title: "Third-Party Integrations",
    slug: "third-party-integrations",
    theme: "Integrations",
    summary:
      "Working with OpenAI, Twilio, and email services as real dependencies with latency, failure modes, and cost.",
    problem:
      "Provider APIs introduce non-local behavior: retries, rate limits, schema changes, and confusing partial failures.",
    investigation:
      "Read provider responses closely, isolate adapters, log meaningful context, and understand what the product should do when providers fail.",
    solution:
      "Wrap provider calls behind small services, normalize errors, and keep business logic separate from SDK details.",
    technologies: ["OpenAI API", "Twilio", "Email services", "NestJS"],
    highlights: [
      "Provider adapters",
      "Failure normalization",
      "Cost-aware behavior",
    ],
  },
  {
    title: "Distributed Frontend and Backend Debugging",
    slug: "distributed-debugging",
    theme: "Debugging",
    summary:
      "Following a bug across UI state, network calls, backend logic, persistence, and deployment configuration.",
    problem: "The visible bug is often several steps away from the real cause.",
    investigation:
      "Reproduce the behavior, inspect request timelines, compare expected and actual payloads, and trace data through each boundary.",
    solution:
      "Debug from symptoms toward causes, preserving evidence at each layer instead of guessing from the first failing screen.",
    technologies: ["React Native", "NestJS", "PostgreSQL", "AWS"],
    highlights: [
      "Layer-by-layer tracing",
      "Payload inspection",
      "Evidence-led debugging",
    ],
  },
  {
    title: "Feed, Snapshot, Lineage, and Personalization Concepts",
    slug: "feed-snapshot-lineage-personalization",
    theme: "Architecture",
    summary:
      "Thinking through content systems where attribution, remix lineage, metadata, and personalization affect product trust.",
    problem:
      "Content feeds become hard to reason about when personalization, derived content, attribution, and history all interact.",
    investigation:
      "Map entities, ownership, snapshots, metadata, remix relationships, ranking inputs, and user-visible explanations.",
    solution:
      "Separate source identity from derived views, preserve lineage, and design metadata so the product can explain itself.",
    technologies: ["System design", "Metadata modeling", "Personalization"],
    highlights: [
      "Lineage modeling",
      "Attribution integrity",
      "Explainable product behavior",
    ],
  },
  {
    title: "Concurrency and Synchronization Concepts",
    slug: "concurrency-synchronization",
    theme: "Correctness",
    summary:
      "Reasoning about shared state, ordering, retries, and race conditions before they become intermittent bugs.",
    problem:
      "Concurrent behavior often fails only under timing pressure, which makes it easy to miss in happy-path testing.",
    investigation:
      "Look for shared resources, non-idempotent operations, ordering assumptions, and places where retries can duplicate effects.",
    solution:
      "Make state transitions explicit, prefer idempotent operations where possible, and test edge timing scenarios intentionally.",
    technologies: ["Concurrency", "Synchronization", "Distributed systems"],
    highlights: [
      "Race-condition awareness",
      "Idempotency",
      "State transition design",
    ],
  },
  {
    title: "AI-Assisted Engineering Workflow",
    slug: "ai-assisted-engineering-workflow",
    theme: "Workflow",
    summary:
      "Using AI naturally for learning, debugging, architecture exploration, and communication without outsourcing judgment.",
    problem:
      "AI can accelerate exploration, but only if the engineer keeps responsibility for correctness and product fit.",
    investigation:
      "Use AI to compare approaches, generate hypotheses, explain unfamiliar code, and pressure-test architecture decisions.",
    solution:
      "Treat AI as a thinking tool: useful for speed and breadth, but always grounded by tests, docs, logs, and code review.",
    technologies: ["AI-assisted development", "Debugging", "Architecture"],
    highlights: [
      "Judgment stays human",
      "Faster exploration",
      "Clearer communication",
    ],
  },
];

export const navCards = [
  {
    key: "about" as const,
    title: "About / Contact",
    eyebrow: "Identity",
    description:
      "Backend focus, iOS experience, education, contact links, and the way Thomas thinks through systems.",
  },
  {
    key: "projects" as const,
    title: "Projects",
    eyebrow: "Work",
    description:
      "A project structure led by a SwiftUI Pokemon app and ready for deeper case studies.",
  },
  {
    key: "notes" as const,
    title: "Engineering Notes",
    eyebrow: "Thinking",
    description:
      "Short case-study notes showing practical ownership across APIs, cloud, integrations, and debugging.",
  },
];
