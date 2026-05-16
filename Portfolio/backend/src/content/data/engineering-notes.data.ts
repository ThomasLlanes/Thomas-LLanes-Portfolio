import { EngineeringNoteDto } from "../dto/engineering-note.dto";

export const engineeringNotes: EngineeringNoteDto[] = [
  {
    title: "REST API Design",
    slug: "rest-api-design",
    theme: "Contracts",
    summary: "Designing endpoints around clear product behavior, predictable validation, and stable client expectations.",
    problem: "Ambiguous API behavior becomes frontend branching and unclear product states.",
    investigation: "Trace request shape, validation rules, response states, and how clients consume each field.",
    solution: "Use explicit DTOs, consistent response contracts, and error states that match product behavior.",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "REST"],
    highlights: ["DTO-first thinking", "Validation boundaries", "Error semantics"]
  },
  {
    title: "OTP Authentication via SMS and Email",
    slug: "otp-authentication",
    theme: "Authentication",
    summary: "Building login flows around delivery constraints, expiration, retries, and user feedback.",
    problem: "OTP failures can come from provider latency, invalid codes, expiration, retries, or abuse controls.",
    investigation: "Inspect code generation, provider responses, retry windows, expiration behavior, and frontend copy.",
    solution: "Model the flow as observable states: requested, delivered, expired, verified, failed, and rate-limited.",
    technologies: ["NestJS", "Twilio", "Transactional email", "Authentication"],
    highlights: ["Stateful auth behavior", "Provider failure handling", "User-visible correctness"]
  },
  {
    title: "Backend and Frontend API Contract Validation",
    slug: "api-contract-validation",
    theme: "Coordination",
    summary: "Reducing integration surprises by making API expectations explicit.",
    problem: "Small differences in nullability, naming, sorting, or metadata can break client assumptions.",
    investigation: "Compare DTOs, client models, fixtures, edge responses, and UI states.",
    solution: "Keep contracts typed, document edge cases, validate payload shape early, and test representative responses.",
    technologies: ["TypeScript", "Swift", "DTOs", "API clients"],
    highlights: ["Contract drift detection", "Typed payloads", "Frontend/backend alignment"]
  },
  {
    title: "AWS Deployment Workflow",
    slug: "aws-deployment-workflow",
    theme: "Cloud",
    summary: "A practical path through Elastic Beanstalk, RDS, Route 53, ACM, and environment-aware configuration.",
    problem: "Deployment issues often hide in DNS, certificates, environment variables, networking, or database access.",
    investigation: "Inspect app health, logs, security groups, certificate status, DNS propagation, and runtime config.",
    solution: "Treat deployment as an end-to-end system with app runtime, database, network, secrets, domains, certificates, and rollback paths.",
    technologies: ["AWS Elastic Beanstalk", "RDS", "Route 53", "ACM"],
    highlights: ["Cloud debugging", "Runtime configuration", "Operational awareness"]
  },
  {
    title: "GitHub Actions CI/CD",
    slug: "github-actions-cicd",
    theme: "Delivery",
    summary: "Automating checks and deployments so correctness is reinforced before release.",
    problem: "Manual release habits make deployments fragile and hard to reason about.",
    investigation: "Identify build steps, secrets, tests, deployment triggers, and failure reporting.",
    solution: "Use focused workflows for validation and deployment, with clear logs and environment-specific settings.",
    technologies: ["GitHub Actions", "TypeScript", "AWS"],
    highlights: ["Repeatable releases", "Automated checks", "Deployment visibility"]
  },
  {
    title: "Third-Party Integrations with OpenAI, Twilio, and Email Services",
    slug: "third-party-integrations",
    theme: "Integrations",
    summary: "Treating provider APIs as real dependencies with latency, failure modes, schema details, and cost.",
    problem: "External providers introduce retries, rate limits, schema changes, and partial failures.",
    investigation: "Read provider responses closely, isolate adapters, log meaningful context, and define fallback product behavior.",
    solution: "Wrap provider calls behind small services, normalize errors, and keep business rules separate from SDK details.",
    technologies: ["OpenAI API", "Twilio", "Email services", "NestJS"],
    highlights: ["Provider adapters", "Failure normalization", "Cost-aware behavior"]
  },
  {
    title: "Debugging Distributed Frontend and Backend Issues",
    slug: "distributed-debugging",
    theme: "Debugging",
    summary: "Following behavior across UI state, network calls, backend logic, persistence, and deployment configuration.",
    problem: "The visible bug is often several boundaries away from the actual cause.",
    investigation: "Reproduce, inspect request timelines, compare payloads, and trace data through each layer.",
    solution: "Move from symptoms toward causes while preserving evidence at every boundary.",
    technologies: ["React Native", "NestJS", "PostgreSQL", "AWS"],
    highlights: ["Layer-by-layer tracing", "Payload inspection", "Evidence-led debugging"]
  },
  {
    title: "Feed, Snapshot, Lineage, Remix Attribution, Metadata, and Personalization Concepts",
    slug: "feed-snapshot-lineage-remix-attribution",
    theme: "Architecture",
    summary: "Thinking through content systems where attribution, remix lineage, metadata, and personalization affect trust.",
    problem: "Feeds become hard to reason about when personalization, derived content, attribution, and history interact.",
    investigation: "Map source identity, snapshots, metadata, remix relationships, ranking inputs, and user-visible explanations.",
    solution: "Separate source identity from derived views, preserve lineage, and design metadata so the product can explain itself.",
    technologies: ["System design", "Metadata modeling", "Personalization"],
    highlights: ["Lineage modeling", "Attribution integrity", "Explainable product behavior"]
  },
  {
    title: "Concurrency and Synchronization Concepts",
    slug: "concurrency-synchronization",
    theme: "Correctness",
    summary: "Reasoning about shared state, ordering, retries, and race conditions before they become intermittent bugs.",
    problem: "Concurrent behavior often fails only under timing pressure.",
    investigation: "Look for shared resources, non-idempotent operations, ordering assumptions, and retry side effects.",
    solution: "Make state transitions explicit, prefer idempotent operations, and test edge timing scenarios intentionally.",
    technologies: ["Concurrency", "Synchronization", "Distributed systems"],
    highlights: ["Race-condition awareness", "Idempotency", "State transition design"]
  },
  {
    title: "AI-Assisted Engineering Workflow",
    slug: "ai-assisted-engineering-workflow",
    theme: "Workflow",
    summary: "Using AI for learning, debugging, communication, and architecture exploration while keeping engineering judgment intact.",
    problem: "AI can accelerate work, but it cannot own correctness, product fit, or operational responsibility.",
    investigation: "Use AI to compare approaches, generate hypotheses, explain unfamiliar code, and pressure-test decisions.",
    solution: "Ground AI-assisted work in tests, docs, logs, code review, and direct understanding of the system.",
    technologies: ["AI-assisted development", "Debugging", "Architecture"],
    highlights: ["Judgment stays human", "Faster exploration", "Clearer communication"]
  }
];

