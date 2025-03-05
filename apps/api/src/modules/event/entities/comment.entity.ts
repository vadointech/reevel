import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event.entity";


@Entity("comment")

export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()

    content: string;

    @ManyToOne(() => Event, (event) => event.comments)
    event: Event;

    constructor(event: Partial<Event>) {
        Object.assign(this, event);
    }
}