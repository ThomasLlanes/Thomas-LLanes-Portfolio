import { Injectable, NotFoundException } from "@nestjs/common";
import { engineeringNotes } from "./data/engineering-notes.data";
import { media } from "./data/media.data";
import { profile } from "./data/profile.data";
import { projects } from "./data/projects.data";
import { PortfolioResponseDto } from "./dto/portfolio-response.dto";

@Injectable()
export class ContentService {
  getProfile() {
    return profile;
  }

  getProjects() {
    return projects;
  }

  getProject(slug: string) {
    const project = projects.find((item) => item.slug === slug);
    if (!project) {
      throw new NotFoundException(`Project "${slug}" was not found.`);
    }
    return project;
  }

  getEngineeringNotes() {
    return engineeringNotes;
  }

  getEngineeringNote(slug: string) {
    const note = engineeringNotes.find((item) => item.slug === slug);
    if (!note) {
      throw new NotFoundException(`Engineering note "${slug}" was not found.`);
    }
    return note;
  }

  getMedia() {
    return media;
  }

  getContactLinks() {
    return profile.contactLinks;
  }

  getPortfolio(): PortfolioResponseDto {
    return {
      profile,
      projects,
      engineeringNotes,
      media,
      contactLinks: profile.contactLinks
    };
  }
}

