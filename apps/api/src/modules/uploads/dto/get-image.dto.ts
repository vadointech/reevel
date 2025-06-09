import { IsEnum, IsOptional, IsString } from "class-validator";
import { SupportedFileCollections, SupportedFileTypes } from "@/modules/uploads/entities/uploads.entity";

export class GetUploadedFileParamsDto {
    @IsString()
    @IsOptional()
    @IsEnum(SupportedFileCollections)
    collection?: SupportedFileCollections;

    @IsString()
    @IsOptional()
    @IsEnum(SupportedFileTypes)
    fileType?: SupportedFileTypes;

    @IsString()
    @IsOptional()
    tags?: string;
}