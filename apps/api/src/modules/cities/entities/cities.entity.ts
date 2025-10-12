import { Entity, PrimaryGeneratedColumn, Column, Index, Polygon, OneToMany, Point } from "typeorm";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";

@Entity("cities")
export class CitiesEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Index({ unique: true })
    @Column({ unique: true })
    mapboxId: string;

    @Column("geography", { spatialFeatureType: "Point", srid: 4326 })
    center: Point;

    @Column("geography", { spatialFeatureType: "Polygon", srid: 4326 })
    bbox: Polygon;

    @OneToMany(() => ProfileEntity, profile => profile.location)
    profiles?: ProfileEntity[];
}