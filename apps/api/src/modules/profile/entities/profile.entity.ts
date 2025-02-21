import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";

@Entity("profiles")
export class ProfileEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    fullName: string;

    @Column()
    bio: string;

    @Column()
    picture?: string;

    @Column("geometry", { spatialFeatureType: "Point", srid: 4326 })
    location: string;

    @Column()
    userId: string;
    @JoinColumn({ name: "userId" })
    @OneToOne(() => UserEntity, user => user.profile, { onDelete: "CASCADE" })
    user: UserEntity;

    @OneToMany(() => ProfileInterestsEntity, interests => interests.profile)
    interests: ProfileInterestsEntity[];
}