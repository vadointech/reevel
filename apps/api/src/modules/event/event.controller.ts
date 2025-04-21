import { Body, Controller, Delete, Param, Post, Req, UseInterceptors } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";
import { UploadEventPosterDto } from "./dto/upload-poster.dto";
import { FileUploadInterceptor, UploadSpeedInterceptor } from "@/modules/uploads/uploads.interceptor";

@Controller("events")
export class EventController {
    constructor(
        private eventService: EventService,
    ) {}

    @Post()
    async createEvent(
        @Body() body: CreateEventDto,
        @Session() session: ServerSession,
    ) {
        return this.eventService.createEvent(session.user.id, body);
    }

    @Post("/poster")
    @UseInterceptors(FileUploadInterceptor, UploadSpeedInterceptor)
    async uploadPoster(
        @Req() request: Express.Request,
        @Body() body: UploadEventPosterDto,
        @Session() session: ServerSession,
    ) {
        const files = request.files as Express.Multer.File[];
        return this.eventService.uploadPoster(session.user.id, body.eventId, files);
    }

    @Delete(":eventId")
    async deleteEvent(
        @Param("eventId") eventId: string,
        @Session() session: ServerSession,
    ) {
        return this.eventService.deleteEvent(session.user.id, eventId);
    }
}