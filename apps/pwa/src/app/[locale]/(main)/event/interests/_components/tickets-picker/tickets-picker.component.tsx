"use client";

import { observer } from "mobx-react-lite";
import { useState } from "react";
import { OptionItem } from "@/components/shared/options";
import { DollarIcon, TicketIcon } from "@/components/icons";
import { TicketsDrawer } from "@/components/drawers/tickets-drawer";
import { PricingDrawer } from "@/components/drawers/pricing-drawer";
import { useEventStore } from "@/features/event";

export namespace TicketsPicker {
    export type Props = {};
}

const formatTicketsValue = (tickets: number): string =>
    tickets === 0 ? 'Unlimited' : tickets.toString();

const formatPriceValue = (price: number): string =>
    price === 0 ? 'Free' : price.toString();

export const TicketsPicker = observer(({ }: TicketsPicker.Props) => {
    const eventStore = useEventStore();
    const [isTicketsDrawerOpen, setIsTicketsDrawerOpen] = useState(false);
    const [isPricingDrawerOpen, setIsPricingDrawerOpen] = useState(false);

    const handleTicketsDrawerClose = () => setIsTicketsDrawerOpen(false);
    const handlePricingDrawerClose = () => setIsPricingDrawerOpen(false);

    return (
        <div>
            <OptionItem
                label="Tickets"
                icon={<TicketIcon />}
                onClick={() => setIsTicketsDrawerOpen(true)}
                value={formatTicketsValue(eventStore.tickets)}
                backIcon
            />

            <OptionItem
                label="Pricing"
                icon={<DollarIcon />}
                value={formatPriceValue(eventStore.price)}
                onClick={() => setIsPricingDrawerOpen(true)}
                backIcon
            />

            <TicketsDrawer
                open={isTicketsDrawerOpen}
                onClose={handleTicketsDrawerClose}
            />

            <PricingDrawer
                open={isPricingDrawerOpen}
                onClose={handlePricingDrawerClose}
            />
        </div>
    );
});
