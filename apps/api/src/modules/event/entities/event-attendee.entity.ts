import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EventEntity } from "./event.entity";
import { UserEntity } from "@/modules/user/entities/user.entity";


@Entity("event_attendee")
export class EventAttendeeEntity {
    @PrimaryColumn()
    eventId: string;
    @JoinColumn({ name: "eventId" })
    @ManyToOne(() => EventEntity, event => event.attendees, { onDelete: "CASCADE" })
    event: EventEntity;

    @PrimaryColumn()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.attendees, { onDelete: "CASCADE" })
    user: UserEntity;
}