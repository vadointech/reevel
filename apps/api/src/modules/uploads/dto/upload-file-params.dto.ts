import { ColorPaletteOptions } from "@/modules/uploads/vibrant/types";

export class UploadFileParamsDto {
    folder?: string;
    tags?: string[];
    colorPalette?: boolean | ColorPaletteOptions;
}