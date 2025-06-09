import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "@/modules/user/entities/user.entity";

export enum SupportedFileTypes {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    RAW = "RAW",
}

export enum SupportedFileCollections {
    EVENT_POSTER = "event_posters",
    UNKNOWN = "unknown",
}

@Entity("user_uploads")
export class UserUploadsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    publicId: string; // cloudinary public_id

    @Column()
    fileUrl: string;

    @Column({ type: "enum", enum: SupportedFileTypes })
    fileType: SupportedFileTypes;

    @Column()
    format: string;

    @Column({ type: "enum", enum: SupportedFileCollections })
    collection: SupportedFileCollections;

    @Column({ type: "json", nullable: true })
    colorPalette?: string[];

    @Column({ default: false })
    isDeleted?: boolean;

    @Column()
    userId: string;
    @JoinColumn({ name: "userId" })
    @ManyToOne(() => UserEntity, user => user.uploads, { onDelete: "CASCADE" })
    user: UserEntity;
}