import { Module } from "@nestjs/common";
import { UploadsService } from "./uploads.service";
import { UploadsController } from "./uploads.controller";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { VibrantModule } from "./vibrant/vibrant.module";
import { UploadsFoldersRegister, UploadsTagsRegister } from "./uploads.register";

@Module({
    imports: [CloudinaryModule, VibrantModule],
    controllers: [UploadsController],
    providers: [UploadsService, UploadsFoldersRegister, UploadsTagsRegister],
    exports: [UploadsService],
})
export class UploadsModule {}
