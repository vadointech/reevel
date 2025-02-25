import { Controller, Post, Req, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { Public } from "@/decorators";
import { CheckImageUploadRequestInterceptor } from "./interceptors/image-upload.interceptor";

@Controller("upload")
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
    ) {}

    @Public()
    @Post("images")
    @UseInterceptors(FilesInterceptor("files", 5), CheckImageUploadRequestInterceptor)
    async uploadImage(
        @Req() request: Express.Request,
    ) {
        const files = request.files as Express.Multer.File[];
        return this.uploadService.uploadImages(files);
    }
}
