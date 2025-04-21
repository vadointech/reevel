import { FilesInterceptor } from "@nestjs/platform-express";
import uploadConfig from "@/modules/uploads/uploads.config";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { tap } from "rxjs";

export const FileUploadInterceptor = FilesInterceptor("files", 5, {
    limits: {
        fileSize: uploadConfig.images.maxFileSize,
    },
});

@Injectable()
export class UploadSpeedInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => {
                    const totalTime = Date.now() - now;
                    console.log(`Upload Speed: ${totalTime / 1000} seconds.`);
                }),
            );
    }
}