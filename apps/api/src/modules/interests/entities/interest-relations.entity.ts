import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";

@Entity("interest_relations")
export class InterestRelationsEntity {
    @PrimaryColumn()
    sourceInterestSlug: string;
    @JoinColumn({ name: "sourceInterestSlug" })
    @ManyToOne(() => InterestsEntity, (interest) => interest.slug, { onDelete: "CASCADE" })
    sourceInterest: InterestsEntity;

    @PrimaryColumn()
    relatedInterestSlug: string;
    @JoinColumn({ name: "relatedInterestSlug" })
    @ManyToOne(() => InterestsEntity, (interest) => interest.slug, { onDelete: "CASCADE" })
    relatedInterest: InterestsEntity;
}