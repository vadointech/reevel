import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryResourceResponse, CloudinaryResponse, CloudinaryUploadOption } from "./types";
import * as streamifier from "streamifier";

@Injectable()
export class CloudinaryService {
    async uploadFile(file: Express.Multer.File, options?: CloudinaryUploadOption): Promise<CloudinaryResponse> {
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

    async getFiles(folder: string, tags?: string[]): Promise<CloudinaryResourceResponse> {
        try {
            const result: CloudinaryResourceResponse = await cloudinary.api.resources({
                type: "upload",
                prefix: folder,
                tags: !!tags,
            });

            if(tags && tags.length > 0) {
                return {
                    resources: result.resources.filter(item => item.tags.some(tag => tags.includes(tag))),
                };
            }

            return result;
        } catch {
            return {
                resources: [],
            };
        }
    }

    async deleteFiles(folder: string, tag?: string[]): Promise<boolean> {
        try {
            const result = await this.getFiles(folder, tag);

            if (!result.resources || result.resources.length === 0) {
                return true;
            }

            await cloudinary.api.delete_resources(
                result.resources.map(item => item.public_id),
            );

            return true;
        } catch {
            return true;
        }
    }
}