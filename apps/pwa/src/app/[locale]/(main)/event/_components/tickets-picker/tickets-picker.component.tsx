"use client";

import { observer } from "mobx-react-lite";
import { useState } from "react";
import { OptionItem } from "@/components/shared/options";
import { IconDollar, IconTicket } from "@/components/icons";
import { TicketsDrawer } from "@/components/drawers/tickets-drawer";
import { PricingDrawer } from "@/components/drawers/pricing-drawer";
import { useEventStore } from "@/features/event";
import { Section, SectionItems } from "@/components/shared/section";

import styles from "./styles.module.scss"

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
        <Section title="Pricing" className={styles.section}>
            <SectionItems variant="column" className={styles.section__items}>
                <OptionItem
                    label="Tickets"
                    description={formatTicketsValue(eventStore.tickets)}

                    icon={<IconTicket />}
                    onClick={() => setIsTicketsDrawerOpen(true)}
                    backIcon
                />

                <OptionItem
                    label="Pricing"
                    description={formatPriceValue(eventStore.price) + ` ₴`}

                    icon={<IconDollar />}
                    onClick={() => setIsPricingDrawerOpen(true)}
                    backIcon
                />

            </SectionItems>
            <TicketsDrawer
                open={isTicketsDrawerOpen}
                onClose={handleTicketsDrawerClose}
            />

            <PricingDrawer
                open={isPricingDrawerOpen}
                onClose={handlePricingDrawerClose}
            />
        </Section>
    );
});
