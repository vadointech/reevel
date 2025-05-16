import { Injectable } from "@nestjs/common";
import { SubscriptionEventRegistry } from "./subscription-event.registry";

@Injectable()
export class SubscriptionRegistry {
    public readonly event: SubscriptionEventRegistry;

    constructor() {
        this.event = new SubscriptionEventRegistry();
    }
}