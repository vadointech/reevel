import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("user_sessions")
export class UserSessionEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    refreshTokenHash: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    userAgent?: string;

    @Column({ type: "varchar", length: 45, nullable: true })
    ipAddress?: string;

    @Column({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    expiresAt: Date;

    @CreateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;

    @Column()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.sessions, { onDelete: "CASCADE" })
    user: UserEntity;
}