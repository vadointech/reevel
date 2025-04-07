"use client";

import { observer } from "mobx-react-lite";

import { useState } from "react";

import { OptionItem } from "@/components/shared/options";
import { DollarIcon, TicketIcon } from "@/components/icons";
import { TicketsDrawer } from "@/components/drawers/tickets-drawer";
import { useEventStore } from "@/features/event";
import { PricingDrawer } from "@/components/drawers/pricing-drawer";
export namespace InformationPicker {
    export type Props = {};
}

export const InformationPicker = observer(({ }: InformationPicker.Props) => {
    const eventStore = useEventStore()

    const [openTickets, setOpenTickets] = useState<boolean>(false);
    const [openPricing, setOpenPricing] = useState<boolean>(false);


    const onCloseTickets = () => {
        setOpenTickets(false)
    }

    const onClosePricing = () => {
        setOpenPricing(false)
    }


    return (
        <div>
            <OptionItem
                label="Tickets"
                icon={<TicketIcon />}
                onClick={() => setOpenTickets(true)}
                value={eventStore.tickets == 0 ? 'Unlimited' : eventStore.tickets}
                backIcon
            />
            <OptionItem
                label="Pricing"
                icon={<DollarIcon />}
                value={`${eventStore.price == 0 ? 'Free' : eventStore.price}`}
                onClick={() => setOpenPricing(true)}
                backIcon
            />

            <TicketsDrawer open={openTickets} onClose={onCloseTickets} />
            <PricingDrawer open={openPricing} onClose={onClosePricing} />

        </div>
    );
});
