import { Public } from "@/decorators";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
@Controller("event")
export class EventController {
    constructor(private eventService: EventService) { }

    @Post()
    async create(@Body() createEventDto: CreateEventDto) {
        return this.eventService.create(createEventDto);
    }

    @Get()
    async findAll() {
        return this.eventService.findAll();
    }

    @Get(":id")
    async getOne(@Param("id") id: string) {
        return this.eventService.findOne(id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventService.update(id, updateEventDto);

    }

    @Public()
    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.eventService.remove(id);

    }
}