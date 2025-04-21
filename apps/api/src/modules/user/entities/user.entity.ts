import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { EventAttendeesEntity } from "@/modules/event/entities/event-attendees.entity";
import { EventHostsEntity } from "@/modules/event/entities/event-hosts.entity";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;

    @OneToMany(() => EventAttendeesEntity, event => event.user)
    tickets: EventAttendeesEntity[];

    @OneToMany(() => EventHostsEntity, event => event.user)
    events: EventHostsEntity[];
}