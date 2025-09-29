import { UserEntity } from "@/entities/user";

export enum SupportedFileTypes {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    RAW = "RAW",
}

export enum SupportedFileCollections {
    EVENT_POSTER = "event_posters",
    PROFILE_PICTURE = "profile_pictures",
    BACKGROUND_PICTURE = "profile_background",
    UNKNOWN = "unknown",
}

export type UserUploadsEntity = {
    id: string;
    publicId: string;
    fileUrl: string;
    fileType: SupportedFileTypes;
    format: string;
    collection: SupportedFileCollections;
    colorPalette: string[];
    userId: string;
    user: UserEntity;
};