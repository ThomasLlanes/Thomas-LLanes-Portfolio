import { MediaDto } from "../dto/media.dto";
import { projects } from "./projects.data";

export const media: MediaDto[] = projects.flatMap((project) => project.media);

