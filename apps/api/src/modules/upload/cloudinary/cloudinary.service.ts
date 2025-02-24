import { Injectable } from "@nestjs/common";
import { UploadApiOptions, v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "./types";
import * as streamifier from "streamifier";

@Injectable()
export class CloudinaryService {
    uploadFile(file: Express.Multer.File, options?: UploadApiOptions): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                options,
                (error, result) => {
                    if(error || !result) return reject(error);
                    resolve(result);
                },
            );

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
}