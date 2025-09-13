import {
    Body,
    Controller,
    Delete, Get, HttpCode, HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseInterceptors,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { Session } from "@/decorators";
import { FileUploadInterceptor } from "@/modules/uploads/uploads.interceptor";
import { UpdateEventDto } from "@/modules/event/dto/update-event.dto";
import { GetNearbyEventsDto } from "@/modules/event/dto/get-nearby.dto";
import { ServerSession } from "@/types";

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
    
    @Post("poster")
    @UseInterceptors(FileUploadInterceptor)
    async uploadPoster(
        @Req() request: Express.Request,
        @Session() session: ServerSession,
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

    @Post("nearby")
    @HttpCode(HttpStatus.OK)
    async getNearbyEvents(
        @Body() body: GetNearbyEventsDto,
    ) {
        return this.eventService.getNearbyEvents(body);
    }

    @Get(":eventId")
    async getEventById(
        @Param("eventId") eventId: string,
    ) {
        return this.eventService.getEventById(eventId);
    }
}