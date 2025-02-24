import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";

@Entity("interest_categories")
export class InterestCategoriesEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name_en: string;

    @Column()
    name_uk: string;

    @OneToMany(() => InterestsEntity, (interest) => interest.category)
    interests: InterestsEntity[];
}