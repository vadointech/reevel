import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { EventAttendeeEntity } from "@/modules/event/entities/event-attendee.entity";
import { EventCreatorsEntity } from "@/modules/event/entities/event-creators.entity";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;

    @OneToMany(() => EventAttendeeEntity, event => event.user)
    attendees: EventAttendeeEntity[];

    @OneToMany(() => EventAttendeeEntity, event => event.user)
    creators: EventCreatorsEntity[];
}