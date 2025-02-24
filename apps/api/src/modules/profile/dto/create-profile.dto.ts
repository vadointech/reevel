import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    fullName?: string;

    @IsString()
    picture?: string;
}