import { IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GetEventCollectionsFeedDto {
    @IsString()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}