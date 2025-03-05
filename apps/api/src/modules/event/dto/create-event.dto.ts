import { IsNotEmpty } from "class-validator";

export class CreateEventDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    image: string;

    @IsNotEmpty()
    seets: number;

    @IsNotEmpty()
    type: string;
}