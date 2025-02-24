import { BadRequestException, Injectable } from "@nestjs/common";
import { CloudinaryService } from "@/modules/upload/cloudinary/cloudinary.service";

@Injectable()
export class UploadService {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
    ) {}


    async uploadImages(files: Express.Multer.File[]) {
        return this.uploadFiles(() => {
            return files.map((file) =>
                this.cloudinaryService.uploadFile(file),
            );
        });
    }

    private async uploadFiles<T>(uploadPromises: () => Promise<T>[]) {
        try {
            return await Promise.all(uploadPromises());
        } catch {
            throw new BadRequestException("Invalid file type.");
        }
    }
}
