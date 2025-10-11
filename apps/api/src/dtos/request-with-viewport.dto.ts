import { IsNotEmpty, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class RequestWithViewportDto {
    @IsString()
    @IsNotEmpty()
    tileId: string;

    @Type(() => Number)
    @Min(9)
    @Max(18)
    zoom: number;
}