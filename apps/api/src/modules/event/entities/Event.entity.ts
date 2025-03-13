import { Column, Entity, Index, Point, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(event: Partial<Event>) {
        Object.assign(this, event);
    }
}


// @OneToMany(() => Comment, (comment) => comment.event, { cascade: true })
// comments: Comment[];