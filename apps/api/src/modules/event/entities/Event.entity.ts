import { Column, Entity, Index, ManyToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";

export enum Visibility {
    PUBLIC = "Public",
    PRIVATE = "Private",
}

@Entity("event")
export class Event {

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

    @ManyToMany(() => UserEntity, attendee => attendee.attendingEvents)
    attendees?: UserEntity[];

    @ManyToMany(() => UserEntity, creator => creator.attendingEvents)
    creators?: UserEntity[];

    @ManyToMany(() => InterestsEntity, interests => interests.interestsEvents)
    interest: InterestsEntity[];

    constructor(event: Partial<Event>) {
        Object.assign(this, event);
    }
}