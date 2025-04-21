import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EventsEntity } from "./events.entity";
import { UserEntity } from "@/modules/user/entities/user.entity";

@Entity("event_creators")
export class EventHostsEntity {
    @PrimaryColumn()
    eventId: string;
    @JoinColumn({ name: "eventId" })
    @ManyToOne(() => EventsEntity, event => event.hosts, { onDelete: "CASCADE" })
    event: EventsEntity;

    @PrimaryColumn()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.events, { onDelete: "CASCADE" })
    user: UserEntity;
}