"use client";

import { ComponentProps } from "react";
import styles from "./styles.module.scss";
import { Event } from "@/entities/event";
import { EventCard } from "@/components/shared/event-card";
import { Container } from "@/components/ui";
import { Button, Header } from "@/components/shared/_redesign";
import { Back, IconInstagram, IconShare } from "@/components/icons";
import { Carousel } from "../carousel/carousel.component";
import { useHtmlDownload } from "@/hooks/use-html-download";
import { Toast } from "../toast";

export namespace ShareEvent {
    export type Props = ComponentProps<"div"> & {
        primaryColor: string,
        secondaryColor: string,
        event?: Event;
        eventTitle: string,
        eventDescription: string,
    };
}

export const ShareEvent = ({
    primaryColor,
    secondaryColor,
    eventTitle,
    eventDescription,
}: ShareEvent.Props) => {

    const { contentRef,
        shareLink,
        shareImage,
        isVisible,
        handleIsVisible,
    } = useHtmlDownload("https://reevel.ua/event/1", [styles.header, styles.buttons]);

    return (
        <Container
            ref={contentRef}
            className={styles.layout}
            style={{
                "--primary-color": primaryColor,
                "--secondary-color": secondaryColor,
            } as React.CSSProperties}
        >
            <Carousel
                className={styles.carousel}
                elements={[
                    <div className={styles.carousel__row}>NEW EVENT NEW EVENT</div>,
                    <div className={styles.carousel__row}>NEW EVENT NEW EVENT</div>,
                    <div className={styles.carousel__row}>NEW EVENT NEW EVENT</div>,
                ]}
                positions={[
                    { row: 0, col: 5 },
                    { row: 1, col: 2 },
                    { row: 2, col: 0 },
                ]}
            />

            <div className={styles.header}>
                <Header controlBefore={<Back />} className={styles.header}>
                    Share Event
                </Header>
            </div>

            <div className={styles.event}>
                <EventCard
                    size={"default"}
                    poster={"/assets/temp/poster5.png"}
                    primaryColor={"#AB002F"}
                    title={"Happy Valentine's Day Party"}
                    location={"ТЦ SkyPark"}
                    type={"Public"}
                    className={styles.event__card}
                />

                <div className={styles.event__info}>
                    <h1>{eventTitle}</h1>
                    <span>{eventDescription}</span>
                </div>
            </div>

            <Toast
                isVisible={isVisible}
                variant={"success"}
                message="Link copied"
                hint="You can add it to your story"
                onClose={() => handleIsVisible()}
            />

            <div className={styles.buttons}>
                <Button
                    variant="outline"
                    iconBefore={<IconShare />}
                    className={styles.buttons__share}
                    onClick={() => shareLink()}
                >
                    Share invitation link
                </Button>

                <Button
                    variant="outline"
                    iconBefore={<IconInstagram />}
                    onClick={() => shareImage()}
                >
                    Share on Instagram
                </Button>
            </div>
        </Container>
    );
};