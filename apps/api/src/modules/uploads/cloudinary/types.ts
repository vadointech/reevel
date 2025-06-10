import { ResourceApiResponse, UploadApiResponse, UploadApiOptions } from "cloudinary";

export type CloudinaryResponse = UploadApiResponse | null;

export type CloudinaryResourceResponse = {
    resources: ResourceApiResponse["resources"][number][]
};

export type CloudinaryUploadOption = UploadApiOptions;