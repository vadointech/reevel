import { EventEntity } from "@/entities/event";

const pictures = [
    "/assets/temp/avatars/avatar1.png",
    "/assets/temp/avatars/avatar2.png",
    "/assets/temp/avatars/avatar3.png",
    "/assets/temp/avatars/avatar4.png",
    "/assets/temp/avatars/avatar5.png",
];

function seedSingleEvent(event: EventEntity): EventEntity {
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
        ],
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
        })),
    };
}

export function seedEventUsers(data: EventEntity): EventEntity;
export function seedEventUsers(data: EventEntity[]): EventEntity[];
export function seedEventUsers(data: EventEntity | EventEntity[]): EventEntity | EventEntity[] {
    if(Array.isArray(data)) {
        return data.map(seedSingleEvent);
    } else {
        return seedSingleEvent(data);
    }
}