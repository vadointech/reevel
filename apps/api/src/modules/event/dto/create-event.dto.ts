import { IsNotEmpty } from "class-validator";

export class CreateEventDto {

    @IsNotEmpty()
    title: string;
}