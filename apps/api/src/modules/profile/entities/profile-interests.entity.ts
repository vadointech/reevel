import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";

@Entity("profile_interests")
export class ProfileInterestsEntity {
    @PrimaryColumn()
    profileId: string;
    @JoinColumn({ name: "profileId" })
    @ManyToOne(() => ProfileEntity, profile => profile.interests, { onDelete: "CASCADE" })
    profile: ProfileEntity;

    @PrimaryColumn()
    interestId: string;
    @JoinColumn({ name: "interestId" })
    @ManyToOne(() => InterestsEntity, interests => interests.profiles, { onDelete: "CASCADE" })
    interest: InterestsEntity;
}