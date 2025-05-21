"use client"

import { ComponentProps } from "react"

import { Button, OptionsListItem, TabsBody, TabsContent, TabsRoot } from "@/components/shared/_redesign"
import { Container } from "@/components/ui"



import styles from "./styles.module.scss"
import { ScrollArea } from "../../shared/_redesign/scroll-area/scroll-area.component"
import { Plan } from "./_components/plan"
import { BottomSheetRoot, BottomSheetTrigger, BottomSheetPortal, BottomSheetBody, BottomSheetContent, BottomSheetHandle } from "@/components/shared/_redesign/bottom-sheet"
import { Back, IconStar } from "@/components/icons"


type SubscriptionFeatures = {
    label: string,
    description: string,
    icon: string,
}

export type SubscriptionData = {
    title: string,
    price: string,
    type?: string,
    description: string,
    features: SubscriptionFeatures[]
}

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
            }
        ]
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
        ]
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
        ]
    },
]


export namespace SubscriptionDrawer {
    export type Props = never;
}

export const SubscriptionDrawer = () => {


    return (
        <>
            <BottomSheetRoot handleOnly fadeThreshold={0}>
                <BottomSheetTrigger>
                    <OptionsListItem
                        label="Subscription"
                        description="Standart"
                        contentRight={<Back width={7} height={14} style={{ rotate: "180deg" }} />}
                        contentLeft={<IconStar width={22} height={22} className={styles.test} />}>
                    </OptionsListItem>
                </BottomSheetTrigger>
                <BottomSheetPortal>
                    <BottomSheetBody>
                        <BottomSheetContent className={styles.content}>
                            <BottomSheetHandle>
                                <Container>
                                    <div className={styles.drawer__title}>Upgrade Plan</div>
                                </Container>
                            </BottomSheetHandle>
                            <TabsRoot>
                                <TabsBody
                                    items={data.map(item => item.title)}
                                >
                                    {data.map((item, i) => (
                                        <TabsContent key={i}>
                                            <>
                                                <ScrollArea >
                                                    <Plan data={item} />
                                                </ScrollArea>
                                                <Container className={styles.buttons}>
                                                    <Button className={styles.buttons__button}>
                                                        Upgrade for {item.price} €/m
                                                    </Button>
                                                </Container>
                                            </>
                                        </TabsContent>
                                    ))}
                                </TabsBody>
                            </TabsRoot>
                        </BottomSheetContent>
                    </BottomSheetBody>
                </BottomSheetPortal>
            </BottomSheetRoot>
        </>
    )
}
