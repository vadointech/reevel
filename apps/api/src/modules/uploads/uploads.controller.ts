import { Controller, Delete, Get, Post, Query, Req, UseInterceptors } from "@nestjs/common";
import { FileUploadInterceptor, UploadSpeedInterceptor } from "./uploads.interceptor";
import { UploadsService } from "./uploads.service";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";
import { GetImageParamsDto } from "./dto/get-image.dto";

@Controller("uploads")
export class UploadsController {
    constructor(
        private readonly uploadsService: UploadsService,
    ) {}

    @Post("images")
    @UseInterceptors(FileUploadInterceptor, UploadSpeedInterceptor)
    async uploadImage(
        @Req() request: Express.Request,
    ) {
        const files = request.files as Express.Multer.File[];
        return this.uploadsService.uploadImages(files);
    }

    @Get()
    async getFiles(
        @Query() params: GetImageParamsDto,
        @Session() session: ServerSession,
    ) {
        return this.uploadsService.getFiles(session.user.id, params);
    }

    @Delete()
    async deleteFiles(
        @Query() params: GetImageParamsDto,
        @Session() session: ServerSession,
    ) {
        return this.uploadsService.deleteFiles(session.user.id, params);
    }
}
