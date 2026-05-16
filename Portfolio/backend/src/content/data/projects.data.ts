import { ProjectDto } from "../dto/project.dto";

export const projects: ProjectDto[] = [
  {
    title: "Pokemon iOS App",
    slug: "pokemon-ios-app",
    description: "A SwiftUI iOS app built in Xcode that consumes the Pokemon API.",
    longDescription:
      "A focused iOS project for exploring API-backed product behavior in SwiftUI: loading states, detail views, reusable components, API parsing, and MVVM boundaries.",
    technologies: ["SwiftUI", "MVVM", "REST API consumption", "Async data flows", "Reusable UI components", "Xcode", "iOS"],
    keyFeatures: [
      "Pokemon list and detail browsing backed by the public Pokemon API",
      "Async loading, empty, and error states",
      "Reusable UI components",
      "View models coordinating API calls and presentation state"
    ],
    architectureNotes: [
      "MVVM keeps view logic separate from networking and parsing.",
      "API model decoding is treated as a boundary that can fail.",
      "Reusable components keep the app ready for additional Pokemon data surfaces."
    ],
    media: [
      {
        type: "video",
        url: "https://hosted-video-url-placeholder.com/pokemon-ios-demo",
        altText: "Video demo placeholder for the Pokemon iOS App",
        placeholder: true
      }
    ],
    links: [
      { label: "GitHub", url: "https://github.com/your-github-placeholder/pokemon-ios-app", placeholder: true },
      { label: "Hosted Video", url: "https://hosted-video-url-placeholder.com/pokemon-ios-demo", placeholder: true }
    ],
    featured: true
  }
];

