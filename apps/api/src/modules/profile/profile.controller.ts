import { Body, Controller, Param, Patch } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { UpdateProfileDto } from "@/modules/profile/dto/update-profile.dto";

@Controller("profile")
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
    ) {}

    @Patch(":id")
    updateProfile(
        @Param("id") profileId: string,
        @Body() body: UpdateProfileDto,
    ) {
        return this.profileService.updateProfile(profileId, body);
    }
}
