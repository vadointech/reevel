import { EventParticipationType } from "@/modules/event/entities/events.entity";

export class ParticipationStatusResponseDto {
    eventId: string;
    participationStatus: EventParticipationType | null;

    constructor(eventId: string, participationStatus: EventParticipationType | null) {
        this.eventId = eventId;
        this.participationStatus = participationStatus;
    }
}