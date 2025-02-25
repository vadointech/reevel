import { v2 as cloudinary } from "cloudinary";
import { ConfigService } from "@/config/config.service";

export const CloudinaryProvider = {
    provide: "CLOUDINARY",
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        return cloudinary.config({
            cloud_name: configService.env("CLOUDINARY_NAME"),
            api_key: configService.env("CLOUDINARY_API_KEY"),
            api_secret: configService.env("CLOUDINARY_API_SECRET"),
        });
    },
};