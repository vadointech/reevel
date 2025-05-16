import { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from "cloudinary";
import { ColorPaletteOptions } from "./vibrant/types";

type SuccessResponse = UploadApiResponse & {
    colorPalette?: string[];
};
type ErrorResponse = UploadApiErrorResponse;

export type FileUploadResponse = SuccessResponse | ErrorResponse;

export type FileUploadOptions = UploadApiOptions & {
    folder?: string;
    tags?: string[];
    colorPalette?: boolean | ColorPaletteOptions
};