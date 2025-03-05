import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";

@Entity("event")
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    seets: number;

    @Column()
    type: string;

    @OneToMany(() => Comment, (comment) => comment.event, { cascade: true })
    comments: Comment[];

    constructor(event: Partial<Event>) {
        Object.assign(this, event);
    }

}