"use client";

import {
    BottomSheetRoot,
    BottomSheetTrigger,
    BottomSheetPortal,
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
} from "@/components/shared/bottom-sheet";

import { TabsBody, TabsContent, TabsRoot } from "@/components/shared/tabs";

import { Button, ButtonsBlock, Header, OptionsListItem } from "@/components/ui";
import { Back, IconStar } from "@/components/icons";

import { Plan } from "./components/plan";

import styles from "./styles.module.scss";

type SubscriptionFeatures = {
    label: string,
    description: string,
    icon: string,
};

export type SubscriptionData = {
    title: string,
    price: string,
    type?: string,
    description: string,
    features: SubscriptionFeatures[]
};

const data: SubscriptionData[] = [
    {
        title: "Chill Guy",
        price: "2,99",
        type: "Special for you",
        description: "For everyday explorers",
        features: [
            {
                label: "Up to 8 Events per Month",
                description: "Publish up to 8 events every month at no extra cost.",
                icon: "📅",
            },
            {
                label: "0% Booking Fee",
                description: "Book tickets with no extra fees — enjoy full price transparency at checkout..",
                icon: "💸",
            },
            {
                label: "See Who’s Attending",
                description: "View the list of attendees who’ve already booked tickets.",
                icon: "👀",
            },
            {
                label: "Customizable Profile",
                description: "View the list of attendees who’ve already booked tickets.",
                icon: "🎨",
            },
        ],
    },
    {
        title: "Performer",
        price: "9,99",
        type: "",
        description: "For those who make it happen",
        features: [
            {
                label: "Up to 8 Events per Month",
                description: "Publish up to 8 events every month at no extra cost.",
                icon: "📅",
            },
            {
                label: "0% Booking Fee",
                description: "Book tickets with no extra fees — enjoy full price transparency at checkout..",
                icon: "💸",
            },
            {
                label: "See Who’s Attending",
                description: "View the list of attendees who’ve already booked tickets.",
                icon: "👀",
            },
        ],
    },
    {
        title: "Standart",
        price: "0",
        type: "Active",
        description: "All you need ti stay in the loop",
        features: [
            {
                label: "Up to 8 Events per Month",
                description: "Publish up to 8 events every month at no extra cost.",
                icon: "📅",
            },
            {
                label: "0% Booking Fee",
                description: "Book tickets with no extra fees — enjoy full price transparency at checkout..",
                icon: "💸",
            },
        ],
    },
];


export namespace SubscriptionDrawer {
    export type Props = never;
}

export const SubscriptionDrawer = () => {

    return (
        <BottomSheetRoot snapPoints={[.95, .6]} defaultSnapPointIndex={1} handleOnly fadeThreshold={0}>
            <BottomSheetTrigger>
                <OptionsListItem
                    label="Subscription"
                    description="Standart"
                    contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                    contentLeft={<IconStar width={22} height={22} className={styles.test} />}>
                </OptionsListItem>
            </BottomSheetTrigger>
            <BottomSheetPortal>
                <BottomSheetBody style={{ height: "100%" }}>
                    <BottomSheetContent className={styles.content}>
                        <BottomSheetHandle>
                            <Header size={"large"}>
                                Upgrade Plan
                            </Header>
                        </BottomSheetHandle>
                        <TabsRoot>
                            <TabsBody
                                items={data.map(item => item.title)}
                            >
                                {
                                    data.map((item, i) => (
                                        <TabsContent key={i}>
                                            <Plan data={item} />
                                            <ButtonsBlock className={styles.buttons}>
                                                <Button>
                                                    Upgrade for {item.price} €/m
                                                </Button>
                                            </ButtonsBlock>
                                        </TabsContent>
                                    ))
                                }
                            </TabsBody>
                        </TabsRoot>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
