import { ISessionUser, ServerSession } from "@/types";
import { ImageColorPalettePreset } from "@/modules/uploads/vibrant/types";
import { SubscriptionType } from "@/modules/subscription/entities/subscription.entity";
import { TokenRegistry } from "./types";

interface ISubscriptionEventRegistry {
    hostingLimit(session: ServerSession): number;
    posterColor(session: ServerSession): ImageColorPalettePreset;
    bookingFee(session: ServerSession, price: number): number;
}

const registry: TokenRegistry<ISubscriptionEventRegistry> = {
    hostingLimit: {
        [SubscriptionType.DEFAULT]: 2,
        [SubscriptionType.PLUS]: 6,
        [SubscriptionType.PREMIUM]: Infinity,
    },
    bookingFee: {
        [SubscriptionType.DEFAULT]: 0.5,
        [SubscriptionType.PLUS]: 0,
        [SubscriptionType.PREMIUM]: 0,
    },
    posterColor: {
        [SubscriptionType.DEFAULT]: ImageColorPalettePreset.Single,
        [SubscriptionType.PLUS]: ImageColorPalettePreset.Default,
        [SubscriptionType.PREMIUM]: ImageColorPalettePreset.Extended,
    },
};

export class SubscriptionEventRegistry implements ISubscriptionEventRegistry {
    hostingLimit(session: ServerSession<ISessionUser>): number {
        return registry.hostingLimit[session.user.subscription];
    }

    posterColor(session: ServerSession<ISessionUser>): ImageColorPalettePreset {
        return registry.posterColor[session.user.subscription];
    }

    bookingFee(session: ServerSession<ISessionUser>, price: number): number {
        return price * registry.bookingFee[session.user.subscription];
    }
}