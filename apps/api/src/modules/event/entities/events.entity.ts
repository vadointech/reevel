import { Column, CreateDateColumn, Entity, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { EventInterestsEntity } from "./event-interests.entity";
import { EventHostsEntity } from "./event-hosts.entity";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";

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

    @Column({ nullable: true })
    ticketsAvailable?: number;

    @Column({ type: "decimal", nullable: true })
    ticketPrice?: number;

    @Column({ type: "enum", enum: EventVisibility, default: EventVisibility.PRIVATE })
    visibility: EventVisibility;

    @Column({ type: "timestamptz" })
    dateTime: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @OneToMany(() => EventHostsEntity, event => event.event)
    hosts: EventHostsEntity[];

    @OneToMany(() => EventInterestsEntity, event => event.event)
    interests: EventInterestsEntity[];

    @OneToMany(() => TicketsEntity, ticket => ticket.event)
    tickets: TicketsEntity[];
}