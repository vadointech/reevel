import {
    createParamDecorator,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";

export const Session = createParamDecorator((key: keyof ServerSession["user"], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request?.user;

    if(user) {
        if(key) return user[key];
        return user;
    } else {
        throw new ForbiddenException();
    }
});