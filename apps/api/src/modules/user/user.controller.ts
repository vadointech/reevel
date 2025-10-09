import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { Session } from "@/decorators";
import { GetUploadedFileParamsDto } from "@/modules/uploads/dto/get-image.dto";
import { ISessionUser, ServerSession } from "@/types";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get("/me")
    async getSession(
        @Session() session: ServerSession<ISessionUser>,
    ) {
        return await this.userService.getUserSession(session);
    }

    @Get("/me/profile")
    getUserProfile(
        @Session() session: ServerSession,
    ) {
        console.log(">>> getting profile");
        return this.userService.getUserProfile(session);
    }

    @Get("/me/interests")
    getUserInterests(
        @Session() session: ServerSession,
    ) {
        console.log(">>> getting interests");
        return this.userService.getUserInterests(session);
    }

    @Get("/me/events")
    async getUserEvents(
        @Session() session: ServerSession,
    ) {
        console.log(">>> getting user events");
        return this.userService.getUserEvents(session);
    }

    @Get("/me/uploads")
    getUserUploads(
        @Query() params: GetUploadedFileParamsDto,
        @Session() session: ServerSession,
    ) {
        console.log(">>> getting uploads");
        return this.userService.getUserUploads(session, params);
    }
    @Delete("/me/uploads/:id")
    updateUserUploads(
        @Param("id") fileId: string,
        @Session() session: ServerSession,
    ) {
        return this.userService.deleteUserUploadedFile(session, fileId);
    }
}
