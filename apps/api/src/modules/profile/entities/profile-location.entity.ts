import { Column, Entity, JoinColumn, OneToOne, Point, Polygon, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Entity("profile_locations")
export class ProfileLocationsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("geography", { spatialFeatureType: "Point", srid: 4326 })
    center: Point;

    @Column()
    placeName: string;

    @Column("geography", { spatialFeatureType: "Polygon", srid: 4326 })
    bbox: Polygon;

    @Column()
    profileId: string;
    @JoinColumn({ name: "profileId" })
    @OneToOne(() => ProfileEntity, profile => profile.location, { onDelete: "CASCADE" })
    profile: ProfileEntity;
}