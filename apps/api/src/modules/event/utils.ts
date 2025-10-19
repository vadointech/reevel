import { EventParticipationType, EventsEntity } from "@/modules/event/entities/events.entity";

export function getEventParticipationType(event: EventsEntity, userId?: string): EventParticipationType | null {
    if(!userId) {
        return null;
    }

    const isHost = event.hosts.some(host => host.userId === userId);
    const isAttendee = event.tickets.some(ticket => ticket.userId === userId);

    let participationType: EventParticipationType | null = null;

    if(isHost) {
        participationType = EventParticipationType.HOSTING;
    } else if(isAttendee) {
        participationType = EventParticipationType.ATTENDING;
    }

    return participationType;
}