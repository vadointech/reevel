import {
    Body,
    Controller,
    Delete, Get,
    Param,
    Patch,
    Post,
    Req,
    UseInterceptors,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto, GetEventResponseDto, ParticipationStatusResponseDto, UpdateEventDto } from "./dto";
import { Public, Session } from "@/decorators";
import { FileUploadInterceptor } from "@/modules/uploads/uploads.interceptor";
import { ISessionUser, ServerSession } from "@/types";

@Controller("events")
export class EventController {
    constructor(
        private eventService: EventService,
    ) {}

    @Post()
    async createEvent(
        @Body() body: CreateEventDto,
        @Session() session: ServerSession<ISessionUser>,
    ) {
        return this.eventService.createEvent(session, body);
    }

    @Public()
    @Get(":eventId")
    async getEventById(
        @Param("eventId") eventId: string,
        @Session() session: ServerSession,
    ): Promise<GetEventResponseDto | null> {
        return this.eventService.getEventById(session, eventId);
    }

    @Get(":eventId/participation")
    async getParticipationStatus(
        @Param("eventId") eventId: string,
        @Session() session: ServerSession,
    ): Promise<ParticipationStatusResponseDto> {
        return this.eventService.getParticipationStatus(eventId, session.user.id);
    }

    @Post("poster")
    @UseInterceptors(FileUploadInterceptor)
    async uploadPoster(
        @Req() request: Express.Request,
        @Session() session: ServerSession<ISessionUser>,
    ) {
        const files = request.files as Express.Multer.File[];
        return this.eventService.uploadPoster(session, files);
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
}