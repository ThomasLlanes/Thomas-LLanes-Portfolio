import { ProfileDto } from "../dto/profile.dto";

export const profile: ProfileDto = {
  name: "Thomas Llanes",
  role: "Software Developer focused on scalable backend systems, iOS experiences, and product-minded engineering.",
  location: "Montevideo, Uruguay",
  email: "thomas.llanes22@gmail.com",
  linkedIn: "https://www.linkedin.com/in/thomas-llanes2202001",
  languages: ["Spanish native", "English advanced", "Cambridge CAE", "Cambridge FCE"],
  summary:
    "Backend-oriented Software Developer with iOS frontend experience, currently building at Codigo del Sur while studying Computer Engineering at Universidad de la Republica. Thomas enjoys understanding why systems behave incorrectly, not just patching symptoms.",
  currentWork: "Software Developer at Codigo del Sur, focused on backend services and SwiftUI iOS experiences.",
  education: "Computer Engineering student at Universidad de la Republica (Udelar).",
  previousExperience: "Technical Support Technician at ORT University, supporting hardware and Moodle LMS systems.",
  skills: {
    backend: ["Node.js", "NestJS", "PostgreSQL", "REST APIs"],
    mobile: ["SwiftUI", "iOS", "MVVM", "Async flows", "Reusable UI components"],
    cloudDevOps: ["AWS Elastic Beanstalk", "RDS", "Route 53", "ACM", "GitHub Actions CI/CD"],
    integrations: ["OpenAI API", "Twilio", "Transactional email systems"],
    strengths: [
      "Authentication systems",
      "OTP via SMS/email",
      "API contract validation",
      "Concurrency and synchronization concepts",
      "Backend/frontend coordination"
    ]
  },
  strengths: [
    "Real-world APIs and cloud deployment",
    "Authentication and OTP product flows",
    "Third-party integration debugging",
    "Architecture exploration with AI-assisted workflows",
    "Care for correctness, maintainability, and product behavior"
  ],
  contactLinks: [
    { label: "Email", url: "mailto:thomas.llanes22@gmail.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/thomas-llanes2202001" },
    { label: "GitHub", url: "https://github.com/your-github-placeholder", placeholder: true },
    { label: "Resume", url: "https://your-resume-link-placeholder.com", placeholder: true }
  ]
};

