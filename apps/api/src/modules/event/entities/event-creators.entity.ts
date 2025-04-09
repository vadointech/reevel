import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EventEntity } from "./event.entity";
import { UserEntity } from "@/modules/user/entities/user.entity";


@Entity("event_creators")
export class EventCreatorsEntity {
    @PrimaryColumn()
    eventId: string;
    @JoinColumn({ name: "eventId" })
    @ManyToOne(() => EventEntity, event => event.creators, { onDelete: "CASCADE" })
    event: EventEntity;

    @PrimaryColumn()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.creators, { onDelete: "CASCADE" })
    user: UserEntity;
}