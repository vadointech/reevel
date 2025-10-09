import { EventParticipationType, EventsEntity } from "@/modules/event/entities/events.entity";

export function polygonToWkt(polygon: any): string | null {
    if (!polygon || !polygon.coordinates || !polygon.coordinates[0]) {
        return null;
    }
    // Беремо зовнішнє кільце координат
    const ring = polygon.coordinates[0];

    // Перетворюємо кожну пару [довгота, широта] у рядок "довгота широта"
    const pointsString = ring.map((p: number[]) => `${p[0]} ${p[1]}`).join(", ");

    // Збираємо фінальний WKT рядок
    return `POLYGON((${pointsString}))`;
}

export function getRandomElements<T>(arr: T[], count: number): T[] {
    return shuffleArray([...arr]).slice(0, count);
}

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getEventParticipationType(event: EventsEntity, userId?: string): EventParticipationType | null {
    if(!userId) {
        return null;
    }

    const isHost = event.hosts.some(host => host.userId === userId);
    const isAttendee = event.tickets.some(ticket => ticket.userId === userId);

    console.log(isHost, isAttendee);

    let participationType: EventParticipationType | null = null;

    if(isHost) {
        participationType = EventParticipationType.HOSTING;
    } else if(isAttendee) {
        participationType = EventParticipationType.ATTENDING;
    }

    return participationType;
}