import { Body, Controller, Get, Patch } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateProfileDto } from "@/modules/profile/dto/update-profile.dto";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";

@Controller("profile")
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
    ) { }

    @Get()
    async getProfile(
        @Session() session: ServerSession,
    ) {
        return this.profileService.getProfile(session.user.id);
    }

    @Patch()
    async updateProfile(
        @Body() body: UpdateProfileDto,
        @Session() session: ServerSession,
    ) {
        return await this.profileService.updateProfile(session.user.id, body);
    }
}
