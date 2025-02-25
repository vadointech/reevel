import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;
}