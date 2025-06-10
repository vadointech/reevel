import { Injectable } from "@nestjs/common";
import { SupportedFileCollections } from "@/modules/uploads/entities/uploads.entity";

type FilesRegister = {
    [key in SupportedFileCollections]: (...args: any[]) => string;
};

@Injectable()
export class UploadsTagsRegister {

}

@Injectable()
export class UploadsFoldersRegister implements FilesRegister {
    [SupportedFileCollections.EVENT_POSTER](userId: string): string {
        return userId + `/${SupportedFileCollections.EVENT_POSTER}`;
    }
    [SupportedFileCollections.UNKNOWN](userId: string): string {
        return userId + `/${SupportedFileCollections.UNKNOWN}`;
    }
}