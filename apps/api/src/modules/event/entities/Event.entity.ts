import { Column, Entity, Index, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { EventInterestsEntity } from "./event-interests.entity";
import { EventAttendeeEntity } from "./event-attendee.entity";
import { EventCreatorsEntity } from "./event-creators.entity";

export enum Visibility {
    PUBLIC = "Public",
    PRIVATE = "Private",
}

@Entity("event")
export class EventEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index()
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Index()
    @Column("geography", { nullable: true, spatialFeatureType: "Point", srid: 4326 })
    location?: Point;

    @Column()
    ticketCount: number;

    @Column({ type: "enum", enum: Visibility })
    visibility: Visibility;

    @Index()
    @Column({ type: "timestamp" })
    eventDateTime: Date;

    @Index()
    @Column({ type: "decimal" })
    price: number;

    @OneToMany(() => EventInterestsEntity, event => event.event)
    interests: EventInterestsEntity[];

    @OneToMany(() => EventAttendeeEntity, event => event.event)
    attendees: EventInterestsEntity[];

    @OneToMany(() => EventCreatorsEntity, event => event.event)
    creators: EventCreatorsEntity[];
}