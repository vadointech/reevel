import { SubscriptionType } from "@/modules/subscription/entities/subscription.entity";

type TokenRegistryMap<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never;
};

export type TokenRegistry<T> = {
    [K in keyof TokenRegistryMap<T>]: Record<SubscriptionType, TokenRegistryMap<T>[K]>
};