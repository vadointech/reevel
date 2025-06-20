import { Session } from "@/types";
import { ImageColorPalettePreset } from "@/modules/uploads/vibrant/types";
import { SubscriptionType } from "@/modules/subscription/entities/subscription.entity";
import { TokenRegistry } from "./types";

interface ISubscriptionEventRegistry {
    hostingLimit(session: Session): number;
    posterColor(session: Session): ImageColorPalettePreset;
    bookingFee(session: Session, price: number): number;
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
    hostingLimit(session: Session): number {
        return registry.hostingLimit[session.user.subscription];
    }

    posterColor(session: Session): ImageColorPalettePreset {
        return registry.posterColor[session.user.subscription];
    }

    bookingFee(session: Session, price: number): number {
        return price * registry.bookingFee[session.user.subscription];
    }
}