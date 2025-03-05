import { Public } from "@/decorators";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Controller("event")
export class EventController {
    constructor(private eventService: EventService) { }

    @Public()
    @Post()
    async create(@Body() createEventDto: CreateEventDto) {
        return this.eventService.create(createEventDto);
    }

    @Public()
    @Get()
    async findAll() {
        return this.eventService.findAll();
    }

    @Public()
    @Get(":id")
    async getOne(@Param("id") id: number) {
        return this.eventService.findOne(+id);
    }

    @Public()
    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventService.update(+id, updateEventDto);

    }

    @Public()
    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.eventService.remove(+id);

    }
}




// @Public()
// @Get()
// getEvents() {
//     return this.eventService.fetchEvents();
// }

// // Query Params
// // getEvents(@Query("sortDesc") sortBy: string) {
// //     console.log(sortBy);
// // }

// @Public()
// @Post("create")
// @UsePipes(new ValidationPipe())
// createPost(@Body() userData: CreatePostDto) {
//     return this.eventService.createEvent(userData);
// }

// @Public()
// @Get(":id")
// getEventById(@Param("id", ParseIntPipe) id: number) {
//     const event = this.eventService.fetchEventById(id);
//     if (!event)
//         throw new HttpException("Event not found", HttpStatus.BAD_REQUEST);
//     return event;
