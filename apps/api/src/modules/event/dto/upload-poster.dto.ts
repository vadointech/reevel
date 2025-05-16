import { IsNotEmpty, IsString } from "class-validator";

export class UploadEventPosterDto {
    @IsString()
    @IsNotEmpty()
    eventId: string;
}