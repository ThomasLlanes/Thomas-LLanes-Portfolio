import { ContactLinkDto } from "./contact-link.dto";
import { MediaDto } from "./media.dto";

export class ProjectDto {
  title!: string;
  slug!: string;
  description!: string;
  longDescription!: string;
  technologies!: string[];
  keyFeatures!: string[];
  architectureNotes!: string[];
  media!: MediaDto[];
  links!: ContactLinkDto[];
  featured!: boolean;
}

