import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { EventsEntity } from "./events.entity";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";

@Entity("event_interests")
export class EventInterestsEntity {
    @PrimaryColumn()
    eventId: string;
    @JoinColumn({ name: "eventId" })
    @ManyToOne(() => EventsEntity, event => event.interests, { onDelete: "CASCADE" })
    event: EventsEntity;

    @PrimaryColumn()
    interestId: string;
    @JoinColumn({ name: "interestId" })
    @ManyToOne(() => InterestsEntity, interests => interests.events, { onDelete: "CASCADE" })
    interest: InterestsEntity;
}