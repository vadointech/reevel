import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { VibrantService } from "./vibrant/vibrant.service";
import { UploadsFoldersRegister } from "./uploads.register";
import { FileUploadOptions, FileUploadResponse } from "./types";
import { GetUploadedFileParamsDto } from "@/modules/uploads/dto/get-image.dto";
import { UploadsRepository } from "@/modules/uploads/repositories/uploads.repository";
import { SupportedFileCollections, SupportedFileTypes } from "@/modules/uploads/entities/uploads.entity";
import { ServerSession } from "@/types";

@Injectable()
export class UploadsService {
    constructor(
        readonly cloudinaryService: CloudinaryService,
        readonly folderRegister: UploadsFoldersRegister,
        private readonly vibrantService: VibrantService,

        private readonly uploadsRepository: UploadsRepository,
    ) {}

    async uploadImages(
        session: ServerSession,
        files: Express.Multer.File[],
        collection: SupportedFileCollections = SupportedFileCollections.UNKNOWN,
        { colorPalette, ...options }: FileUploadOptions = {},
    ) {
        const uploadAndColorPromises = files.map(async file => {
            const folder = this.folderRegister[collection](session.user.id);
            return Promise.all([
                this.cloudinaryService.uploadFile(file, {
                    folder,
                    ...options,
                }),
                this.extractColorPalette(file, colorPalette),
            ]);
        });

        const result = await Promise.all(uploadAndColorPromises);

        const uploads: FileUploadResponse[] =  result.map(([cloudinary, palette]) => {
            if(cloudinary) {
                return {
                    ...cloudinary,
                    colorPalette: palette,
                };
            }
            return null;
        });

        return this.uploadsRepository.createAndSaveMany(
            uploads.map(item => {
                return {
                    publicId: item?.public_id,
                    fileUrl: item?.secure_url,
                    fileType: SupportedFileTypes.IMAGE,
                    format: item?.format,
                    collection: collection,
                    colorPalette: item?.colorPalette,
                    userId: session.user.id,
                };
            }),
        );
    }

    extractColorPalette(file: Express.Multer.File, preset: FileUploadOptions["colorPalette"]) {
        if(!preset) return;

        if(typeof preset === "boolean") {
            return this.vibrantService.extractColorPalette(file.buffer);
        } else {
            return this.vibrantService.extractColorPalette(file.buffer, preset);
        }
    }

    getFiles(userId: string, input: GetUploadedFileParamsDto) {
        const tags = input.tags?.split(",");
        return this.cloudinaryService.getFiles(
            userId + (input.collection ? `/${input.collection}` : ""),
            tags,
        );
    }

    deleteFiles(userId: string, input: GetUploadedFileParamsDto) {
        const tags = input.tags?.split(",");
        return this.cloudinaryService.deleteFiles(
            userId + (input.collection ? `/${input.collection}` : ""),
            tags,
        );
    }
}
