import { ColorPaletteOptions } from "./vibrant/types";
import { CloudinaryResponse, CloudinaryUploadOption } from "@/modules/uploads/cloudinary/types";

export type FileUploadResponse = CloudinaryResponse & {
    colorPalette?: string[];
} | null;

export type FileUploadOptions = CloudinaryUploadOption & {
    colorPalette?: boolean | ColorPaletteOptions
};