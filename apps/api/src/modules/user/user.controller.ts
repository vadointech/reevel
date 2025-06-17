import { Controller, Delete, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";
import { GetUploadedFileParamsDto } from "@/modules/uploads/dto/get-image.dto";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get("/me")
    getSession(
        @Session() session: ServerSession,
    ) {
        return this.userService.getUserSession(session.user.id);
    }

    @Get("/me/interests")
    getUserInterests(
        @Session() session: ServerSession,
    ) {
        return this.userService.getUserInterests(session);
    }

    @Get("/me/uploads")
    getUserUploads(
        @Query() params: GetUploadedFileParamsDto,
        @Session() session: ServerSession,
    ) {
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
