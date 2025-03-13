import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { Event } from "@/modules/event/entities/event.entity";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;

    @ManyToMany(() => Event, event => event.attendees)
    @JoinTable({
        name: "events_attendee",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "event_id", referencedColumnName: "id" },
    })
    attendingEvents: Event[];

    @ManyToMany(() => Event, event => event.creators)
    @JoinTable({
        name: "events_creators",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "event_id", referencedColumnName: "id" },
    })
    creators: Event[];
}