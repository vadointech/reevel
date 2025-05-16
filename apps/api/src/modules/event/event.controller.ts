import { Body, Controller, Delete, Param, Patch, Post, Req, UseInterceptors } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";
import { FileUploadInterceptor } from "@/modules/uploads/uploads.interceptor";
import { UpdateEventDto } from "@/modules/event/dto/update-event.dto";

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
        return this.eventService.createEvent(session, body);
    }

    @Patch(":eventId")
    async updateEvent(
        @Body() body: UpdateEventDto,
        @Param("eventId") eventId: string,
        @Session() session: ServerSession,
    ) {
        return this.eventService.updateEvent(session, eventId, body);
    }

    @Delete(":eventId")
    async deleteEvent(
        @Param("eventId") eventId: string,
        @Session() session: ServerSession,
    ) {
        return this.eventService.deleteEvent(session, eventId);
    }

    @Post(":eventId/poster")
    @UseInterceptors(FileUploadInterceptor)
    async uploadPoster(
        @Req() request: Express.Request,
        @Param("eventId") eventId: string,
        @Session() session: ServerSession,
    ) {
        const files = request.files as Express.Multer.File[];
        return this.eventService.uploadPoster(session, eventId, files);
    }
}