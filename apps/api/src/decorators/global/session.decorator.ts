import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";

export const Session = createParamDecorator((_key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request?.user;

    if(!user) throw new UnauthorizedException();
    return user;
});