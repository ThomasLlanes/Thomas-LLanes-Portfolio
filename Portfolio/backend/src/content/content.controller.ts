import { Controller, Get, Param } from "@nestjs/common";
import { ContentService } from "./content.service";

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get("profile")
  getProfile() {
    return this.contentService.getProfile();
  }

  @Get("projects")
  getProjects() {
    return this.contentService.getProjects();
  }

  @Get("projects/:slug")
  getProject(@Param("slug") slug: string) {
    return this.contentService.getProject(slug);
  }

  @Get("engineering-notes")
  getEngineeringNotes() {
    return this.contentService.getEngineeringNotes();
  }

  @Get("engineering-notes/:slug")
  getEngineeringNote(@Param("slug") slug: string) {
    return this.contentService.getEngineeringNote(slug);
  }

  @Get("media")
  getMedia() {
    return this.contentService.getMedia();
  }

  @Get("contact-links")
  getContactLinks() {
    return this.contentService.getContactLinks();
  }

  @Get("portfolio")
  getPortfolio() {
    return this.contentService.getPortfolio();
  }
}

