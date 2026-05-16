import { ContactLinkDto } from "./contact-link.dto";

export class ProfileDto {
  name!: string;
  role!: string;
  location!: string;
  email!: string;
  linkedIn!: string;
  languages!: string[];
  summary!: string;
  currentWork!: string;
  education!: string;
  previousExperience!: string;
  skills!: {
    backend: string[];
    mobile: string[];
    cloudDevOps: string[];
    integrations: string[];
    strengths: string[];
  };
  strengths!: string[];
  contactLinks!: ContactLinkDto[];
}

