import { IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class RequestWithPaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit?: number;
}