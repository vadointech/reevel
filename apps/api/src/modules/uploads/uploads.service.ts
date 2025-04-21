import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { VibrantService } from "./vibrant/vibrant.service";
import { UploadsTagsRegister, UploadsFoldersRegister } from "./uploads.register";
import { FileUploadOptions, FileUploadResponse } from "./types";
import { GetImageParamsDto } from "@/modules/uploads/dto/get-image.dto";

@Injectable()
export class UploadsService {
    constructor(
        readonly cloudinaryService: CloudinaryService,
        readonly tagRegister: UploadsTagsRegister,
        readonly folderRegister: UploadsFoldersRegister,
        private readonly vibrantService: VibrantService,
    ) {}

    async uploadImages(files: Express.Multer.File[] = [], options?: FileUploadOptions): Promise<FileUploadResponse[]> {
        const uploadAndColorPromises = files.map(async file => {
            return Promise.all([
                this.cloudinaryService.uploadFile(file, options),
                (() => {
                    if(options) {
                        if(typeof options.colorPalette === "boolean") {
                            if(options.colorPalette) return this.vibrantService.extractColorPalette(file.buffer);
                        } else {
                            return this.vibrantService.extractColorPalette(file.buffer, options.colorPalette);
                        }
                    }
                })(),
            ]);
        });

        const result = await Promise.all(uploadAndColorPromises);
        return result.map(([cloudinary, palette]) => ({
            ...cloudinary,
            colorPalette: palette,
        }));
    }

    getFiles(userId: string, input: GetImageParamsDto) {
        const tags = input.tags?.split(",");
        return this.cloudinaryService.getFiles(
            userId + (input.folder ? `/${input.folder}` : ""),
            tags,
        );
    }

    deleteFiles(userId: string, input: GetImageParamsDto) {
        const tags = input.tags?.split(",");
        return this.cloudinaryService.deleteFiles(
            userId + (input.folder ? `/${input.folder}` : ""),
            tags,
        );
    }
}
