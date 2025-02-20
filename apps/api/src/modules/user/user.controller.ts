import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";

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
}
