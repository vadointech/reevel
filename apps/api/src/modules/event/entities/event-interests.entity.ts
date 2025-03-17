import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EventEntity } from "./event.entity";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";


@Entity("event_interests")
export class EventInterestsEntity {
    @PrimaryColumn()
    eventId: string;
    @JoinColumn({ name: "eventId" })
    @ManyToOne(() => EventEntity, event => event.interests, { onDelete: "CASCADE" })
    event: EventEntity;

    @PrimaryColumn()
    interestId: string;
    @JoinColumn({ name: "interestId" })
    @ManyToOne(() => InterestsEntity, interests => interests.events, { onDelete: "CASCADE" })
    interest: InterestsEntity;
}