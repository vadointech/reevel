import { Body, Controller, Patch, Post, Req, UseInterceptors } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateProfileDto } from "@/modules/profile/dto/update-profile.dto";
import { Session } from "@/decorators";
import { FileUploadInterceptor } from "@/modules/uploads/uploads.interceptor";
import { ServerSession } from "@/types";

@Controller("profile")
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
    ) {}

    @Patch()
    async updateProfile(
        @Body() body: UpdateProfileDto,
        @Session() session: ServerSession,
    ) {
        return this.profileService.updateProfile(session.user.id, body);
    }

    @Post("picture")
    @UseInterceptors(FileUploadInterceptor)
    async uploadPoster(
        @Req() request: Express.Request,
        @Session() session: ServerSession,
    ) {
        return this.profileService.uploadAvatar(session, request.files as Express.Multer.File[]);
    }
}
