import { Module } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { SubscriptionController } from "./subscription.controller";
import { SubscriptionRepository } from "@/modules/subscription/subscription.repository";

@Module({
    controllers: [SubscriptionController],
    providers: [SubscriptionRepository, SubscriptionService],
    exports: [SubscriptionRepository],
})
export class SubscriptionModule {}
