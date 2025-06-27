import { Column, CreateDateColumn, Entity, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { EventInterestsEntity } from "./event-interests.entity";
import { EventHostsEntity } from "./event-hosts.entity";
import { EventTicketsEntity } from "@/modules/event/entities/event-tickets.entity";
import { SupportedCurrencies } from "@/modules/payment/entities/payment.entity";

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
    @Column()
    posterFieldId: string;

    @Column({ nullable: true })
    primaryColor?: string;

    @Column("geography", { nullable: true, spatialFeatureType: "Point", srid: 4326 })
    locationPoint?: Point;

    @Column()
    locationTitle: string;

    @Column({ nullable: true })
    ticketsAvailable?: number;

    @Column("numeric", { nullable: true, precision: 10, scale: 2 })
    ticketPrice?: number;

    @Column({ type: "enum", enum: SupportedCurrencies, default: SupportedCurrencies.UAH })
    ticketPriceCurrency: SupportedCurrencies;

    @Column({ type: "enum", enum: EventVisibility, default: EventVisibility.PRIVATE })
    visibility: EventVisibility;

    @Column({ type: "timestamptz" })
    startDate: Date;

    @Column({ type: "timestamptz", nullable: true })
    endDate?: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Column({ type: "boolean", default: false })
    isFeatured: boolean;

    @OneToMany(() => EventHostsEntity, event => event.event, {
        cascade: true,
    })
    hosts: EventHostsEntity[];

    @OneToMany(() => EventInterestsEntity, event => event.event)
    interests: EventInterestsEntity[];

    @OneToMany(() => EventTicketsEntity, ticket => ticket.event)
    tickets: EventTicketsEntity[];
}