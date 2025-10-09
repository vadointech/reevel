import { EventParticipationType, EventsEntity } from "@/modules/event/entities/events.entity";

export class GetEventResponseDto extends EventsEntity {
    participationType: EventParticipationType | null;

    constructor({ participationType, ...event }: GetEventResponseDto) {
        super();
        Object.assign(this, event);
        this.participationType = participationType;
    }
}