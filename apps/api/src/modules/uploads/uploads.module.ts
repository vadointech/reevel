import { Module } from "@nestjs/common";
import { UploadsService } from "./uploads.service";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { VibrantModule } from "./vibrant/vibrant.module";
import { UploadsFoldersRegister, UploadsTagsRegister } from "./uploads.register";
import { UploadsRepository } from "@/modules/uploads/repositories/uploads.repository";

@Module({
    imports: [CloudinaryModule, VibrantModule],
    providers: [
        UploadsService,
        UploadsFoldersRegister,
        UploadsTagsRegister,

        UploadsRepository,
    ],
    exports: [UploadsService],
})
export class UploadsModule {}
