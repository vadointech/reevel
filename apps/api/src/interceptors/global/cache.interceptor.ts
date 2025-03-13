import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response = context.switchToHttp().getResponse();
        response.set("Cache-Control", "public, max-age=600, stale-while-revalidate=300");

        return next.handle().pipe(map((data) => data));
    }
}