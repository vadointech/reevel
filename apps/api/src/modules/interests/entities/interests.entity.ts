import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";

@Entity("interests")
export class InterestsEntity {
    @PrimaryColumn()
    slug: string;

    @Column()
    title: string;

    @Column()
    icon: string;

    @Column()
    color: string;

    @OneToMany(() => ProfileInterestsEntity, interests => interests.interest)
    profiles: ProfileInterestsEntity[];
}