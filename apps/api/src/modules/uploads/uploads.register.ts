import { Injectable } from "@nestjs/common";

export const UploadsFileType = {
    Events: "events",
} as const;
export type UploadsFileType = ObjectValues<typeof UploadsFileType>;

type FilesRegister = Record<UploadsFileType, (...args: any[]) => string>;

@Injectable()
export class UploadsTagsRegister implements FilesRegister {
    events(eventId: string): string {
        return "event-" + eventId;
    }
}

@Injectable()
export class UploadsFoldersRegister implements FilesRegister {
    events(userId: string): string {
        return userId + `/${UploadsFileType.Events}`;
    }
}