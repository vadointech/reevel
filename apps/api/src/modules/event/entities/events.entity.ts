import { Column, Entity, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { EventInterestsEntity } from "./event-interests.entity";
import { EventAttendeesEntity } from "./event-attendees.entity";
import { EventHostsEntity } from "./event-hosts.entity";

export enum EventVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}

@Entity("events")
export class EventsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    poster: string;

    @Column({ default: "#212629"})
    primaryColor?: string;

    @Column("geography", { nullable: true, spatialFeatureType: "Point", srid: 4326 })
    location?: Point;

    @Column({ default: 0 })
    ticketCount?: number;

    @Column({ type: "decimal", default: 0 })
    ticketPrice?: number;

    @Column({ type: "enum", enum: EventVisibility, default: EventVisibility.PRIVATE })
    visibility: EventVisibility;

    @Column({ type: "timestamptz" })
    dateTime: Date;

    @OneToMany(() => EventHostsEntity, event => event.event)
    hosts: EventHostsEntity[];

    @OneToMany(() => EventInterestsEntity, event => event.event)
    interests: EventInterestsEntity[];

    @OneToMany(() => EventAttendeesEntity, event => event.event)
    attendees: EventAttendeesEntity[];
}