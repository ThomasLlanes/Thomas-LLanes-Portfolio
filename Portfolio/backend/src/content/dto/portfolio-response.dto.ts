import { ContactLinkDto } from "./contact-link.dto";
import { EngineeringNoteDto } from "./engineering-note.dto";
import { MediaDto } from "./media.dto";
import { ProfileDto } from "./profile.dto";
import { ProjectDto } from "./project.dto";

export class PortfolioResponseDto {
  profile!: ProfileDto;
  projects!: ProjectDto[];
  engineeringNotes!: EngineeringNoteDto[];
  media!: MediaDto[];
  contactLinks!: ContactLinkDto[];
}

