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

    @OneToOne(() => ProfileLocationsEntity, location => location.profile, { nullable: true, onDelete: "SET NULL" })
    location?: ProfileLocationsEntity;

    @Column({ nullable: true })
    completed: string; // "true" | "false" | "current step"

    @Column()
    userId: string;
    @JoinColumn({ name: "userId" })
    @OneToOne(() => UserEntity, user => user.profile, { onDelete: "CASCADE" })
    user: UserEntity;

    @OneToMany(() => ProfileInterestsEntity, interests => interests.profile)
    interests: ProfileInterestsEntity[];
}