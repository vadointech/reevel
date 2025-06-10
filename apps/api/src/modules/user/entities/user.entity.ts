import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileEntity } from "@/modules/profile/entities/profile.entity";
import { EventHostsEntity } from "@/modules/event/entities/event-hosts.entity";
import { EventTicketsEntity } from "@/modules/event/entities/event-tickets.entity";
import { PaymentsEntity } from "@/modules/payment/entities/payment.entity";
import { SubscriptionEntity } from "@/modules/subscription/entities/subscription.entity";
import { UserUploadsEntity } from "@/modules/uploads/entities/uploads.entity";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @OneToOne(() => ProfileEntity, (profile) => profile.user)
    profile: ProfileEntity;

    @OneToMany(() => EventTicketsEntity, ticket => ticket.user)
    tickets: EventTicketsEntity[];

    @OneToMany(() => EventHostsEntity, event => event.user)
    events: EventHostsEntity[];

    @OneToMany(() => PaymentsEntity, payment => payment.user)
    payments: PaymentsEntity[];

    @OneToOne(() => SubscriptionEntity, subscription => subscription.user)
    subscription: SubscriptionEntity;

    @OneToMany(() => UserUploadsEntity, upload => upload.user)
    uploads: UserUploadsEntity[];
}