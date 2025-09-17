import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";
import { ProfileLocationsEntity } from "@/modules/profile/entities/profile-location.entity";

@Entity("profiles")
export class ProfileEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    fullName?: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    picture?: string;

    @OneToOne(() => ProfileLocationsEntity, location => location.profile, {
        cascade: true,
        nullable: true,
        onDelete: "SET NULL",
    })
    location?: ProfileLocationsEntity;

    @Column({ default: 0 })
    completed: number; // "current step" | "-1" (means profile completed)

    @Column()
    userId: string;
    @JoinColumn({ name: "userId" })
    @OneToOne(() => UserEntity, user => user.profile, { onDelete: "CASCADE" })
    user: UserEntity;

    @OneToMany(() => ProfileInterestsEntity, interests => interests.profile, {
        cascade: true,
    })
    interests: ProfileInterestsEntity[];
    profile: { events: import("e:/Reevel/reevel-app/apps/api/src/modules/event/entities/event-hosts.entity").EventHostsEntity[]; };
}