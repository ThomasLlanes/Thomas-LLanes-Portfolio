export type MediaType = "video" | "image" | "document";

export class MediaDto {
  type!: MediaType;
  url!: string;
  altText!: string;
  posterImage?: string;
  placeholder?: boolean;
}

