import { EventsEntity } from "@/modules/event/entities/events.entity";
import { EventHostsEntity } from "@/modules/event/entities/event-hosts.entity";
import { EventTicketsEntity } from "@/modules/event/entities/event-tickets.entity";

const pictures = [
    "/assets/temp/avatars/avatar1.png",
    "/assets/temp/avatars/avatar2.png",
    "/assets/temp/avatars/avatar3.png",
    "/assets/temp/avatars/avatar4.png",
    "/assets/temp/avatars/avatar5.png",
];

function seedSingleEventAttendees(event: EventsEntity): EventsEntity {
    const seed = [...event.id].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const participantsCount = (seed % 4) + 2;

    const ticketPictures = Array.from({ length: participantsCount }).map((_, i) => {
        const index = (seed + i + 1) % pictures.length;
        return pictures[index];
    });

    return {
        ...event,
        tickets: ticketPictures.map((picture, index) => ({
            eventId: event.id,
            userId: `${event.id}_${index}_ticket_user_id`,
            user: {
                id: `${event.id}_${index}_ticket_user_id`,
                email: `${event.id}_${index}_ticket_user_email`,
                profile: {
                    id: `${event.id}_${index}_ticket_user_profile_id`,
                    userId: `${event.id}_${index}_ticket_user_id`,
                    completed: -1,
                    fullName: "Reevel Team",
                    picture,
                },
            },
        })) as EventTicketsEntity[],
    };
}

function seedSingleEvent(event: EventsEntity): EventsEntity {
    const seed = [...event.id].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const hostPictureIndex = seed % pictures.length;
    const hostPicture = pictures[hostPictureIndex];

    const participantsCount = (seed % 4) + 2;

    const ticketPictures = Array.from({ length: participantsCount }).map((_, i) => {
        const index = (seed + i + 1) % pictures.length;
        return pictures[index];
    });

    return {
        ...event,
        hosts: [
            {
                eventId: event.id,
                userId: `${event.id}_host_user_id`,
                user: {
                    id: `${event.id}_host_user_id`,
                    email: `${event.id}_host_user_email`,
                    profile: {
                        id: `${event.id}_host_user_profile_id`,
                        userId: `${event.id}_host_user_id`,
                        completed: -1,
                        fullName: "Reevel Team",
                        picture: hostPicture,
                    },
                },
            },
        ] as EventHostsEntity[],
        tickets: ticketPictures.map((picture, index) => ({
            eventId: event.id,
            userId: `${event.id}_${index}_ticket_user_id`,
            user: {
                id: `${event.id}_${index}_ticket_user_id`,
                email: `${event.id}_${index}_ticket_user_email`,
                profile: {
                    id: `${event.id}_${index}_ticket_user_profile_id`,
                    userId: `${event.id}_${index}_ticket_user_id`,
                    completed: -1,
                    fullName: "Reevel Team",
                    picture,
                },
            },
        })) as EventTicketsEntity[],
    };
}

export function seedEventUsers(data: EventsEntity): EventsEntity;
export function seedEventUsers(data: EventsEntity[]): EventsEntity[];
export function seedEventUsers(data: EventsEntity | EventsEntity[]): EventsEntity | EventsEntity[] {
    if(Array.isArray(data)) {
        return data.map(seedSingleEvent);
    } else {
        return seedSingleEvent(data);
    }
}

export function seedEventAttendees(data: EventsEntity): EventsEntity;
export function seedEventAttendees(data: EventsEntity[]): EventsEntity[];
export function seedEventAttendees(data: EventsEntity | EventsEntity[]): EventsEntity | EventsEntity[] {
    if(Array.isArray(data)) {
        return data.map(seedSingleEventAttendees);
    } else {
        return seedSingleEventAttendees(data);
    }
}