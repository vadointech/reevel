import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import uploadConfig from "@/modules/upload/upload.config";

@Injectable()
export class CheckImageUploadRequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();

        const files = request.files as Express.Multer.File[];

        for(const file of files) {
            if(!file || !file.buffer) {
                throw new BadRequestException();
            }

            if(!uploadConfig.images.types.includes(file.mimetype)) {
                throw new BadRequestException("Invalid file type.");
            }

            if(file.size > uploadConfig.images.maxFileSize) {
                throw new BadRequestException("Invalid file size.");
            }
        }


        return next.handle();
    }
}