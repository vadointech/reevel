import { ResourceApiResponse, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export type CloudinaryResourceResponse = {
    resources: ResourceApiResponse["resources"][number][]
};