import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";
import { CitiesEntity } from "@/modules/cities/entities/cities.entity";

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

    @Column({ nullable: true })
    locationId?: string;
    @JoinColumn({ name: "locationId" })
    @ManyToOne(() => CitiesEntity, city => city.profiles, {
        nullable: true,
        onDelete: "SET NULL",
    })
    location?: CitiesEntity;

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
    interests?: ProfileInterestsEntity[];
}