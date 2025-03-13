import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { ProfileInterestsEntity } from "@/modules/profile/entities/profile-interests.entity";
import { InterestCategoriesEntity } from "./interest-category.entity";
import { InterestRelationsEntity } from "./interest-relations.entity";
import { Event } from "@/modules/event/entities/event.entity";

@Entity("interests")
export class InterestsEntity {
    @PrimaryColumn()
    slug: string;

    @Column()
    title_en: string;

    @Column()
    title_uk: string;

    @Column()
    icon: string;

    @Column()
    primaryColor: string;

    @Column()
    secondaryColor: string;

    @Column()
    categoryId: string;
    @JoinColumn({ name: "categoryId" })
    @ManyToOne(() => InterestCategoriesEntity, (category) => category.interests, { onDelete: "CASCADE" })
    category: InterestCategoriesEntity;

    @ManyToMany(() => Event, event => event.interest)
    @JoinTable({
        name: "interests_events",
        joinColumn: { name: "slug", referencedColumnName: "slug" },
        inverseJoinColumn: { name: "event_id", referencedColumnName: "id" },
    })
    interestsEvents: Event[];

    @OneToMany(() => InterestRelationsEntity, relation => relation.sourceInterestSlug)
    sourceRelations: InterestRelationsEntity[];

    @OneToMany(() => InterestRelationsEntity, relation => relation.relatedInterestSlug)
    relatedRelations: InterestRelationsEntity[];

    @OneToMany(() => ProfileInterestsEntity, interests => interests.interest)
    profiles?: ProfileInterestsEntity[];
}