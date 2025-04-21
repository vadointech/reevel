import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EventsEntity } from "./events.entity";
import { UserEntity } from "@/modules/user/entities/user.entity";

@Entity("event_attendees")
export class EventAttendeesEntity {
    @PrimaryColumn()
    eventId: string;
    @JoinColumn({ name: "eventId" })
    @ManyToOne(() => EventsEntity, event => event.attendees, { onDelete: "CASCADE" })
    event: EventsEntity;

    @PrimaryColumn()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.tickets, { onDelete: "CASCADE" })
    user: UserEntity;
}