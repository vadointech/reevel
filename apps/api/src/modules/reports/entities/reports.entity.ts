import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventsEntity } from "@/modules/event/entities/events.entity";
import { UserEntity } from "@/modules/user/entities/user.entity";

export enum ReportType {
    INCORRECT_DETAILS = "INCORRECT_DETAILS",
    FRAUDULENT_ACTIVITY = "FRAUDULENT_ACTIVITY",
    INAPPROPRIATE_CONTENT = "INAPPROPRIATE_CONTENT",
    SPAM = "SPAM",
    OTHER = "OTHER",
}

@Entity("reports")
export class ReportsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "enum", enum: ReportType, default: ReportType.OTHER })
    type: ReportType;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @Column()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.reports, { onDelete: "CASCADE" })
    user?: UserEntity;

    @Column()
    eventId?: string;
    @JoinColumn({ name: "eventId" })
    @ManyToOne(() => EventsEntity, event => event.tickets, { onDelete: "CASCADE" })
    event?: EventsEntity;
}