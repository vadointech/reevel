import { IsIn, IsOptional, IsString } from "class-validator";
import { UploadsFileType } from "@/modules/uploads/uploads.register";

export class GetImageParamsDto {
    @IsString()
    @IsOptional()
    @IsIn(Object.values(UploadsFileType))
    folder?: UploadsFileType;

    @IsString()
    @IsOptional()
    tags?: string;
}