import cx from "classnames";
import {
    IconTicket,
    IconShareOutline,
    IconEllipsisHorizontal,
    IconCheck,
    IconClose,
    IconCycle,
    IconCalendarOutline,
    IconSettings,
} from "@/components/icons";
import styles from "../styles.module.scss";
import { EventEntity, EventParticipationType, EventVisibility } from "@/entities/event";
import { useTicketReservation } from "@/features/event/booking/hooks";
import { Link, useRouter } from "@/i18n/routing";
import { PropsWithChildren } from "react";

import { EventMoreActionsDrawer } from "./more-drawer.componsent";
import { useEventActions } from "@/features/event/hooks";


export namespace EventDrawerHeroButtons {
    export type Props = EventEntity;
}

export const EventDrawerHeroButtons = (event: EventDrawerHeroButtons.Props) => {
    const {
        handleShareEvent,
    } = useEventActions(event);

    if(event.participationType === EventParticipationType.HOSTING) {
        return (
            <>
                <button
                    className={cx(
                        styles.button,
                        styles.button_primary,
                        styles.button_share,
                    )}
                >
                    <IconShareOutline />
                    Invite guests
                </button>
                <button
                    className={cx(
                        styles.button,
                        styles.button_settings,
                    )}
                >
                    <IconSettings />
                    Settings
                </button>
            </>
        );
    }


    switch (event.visibility) {
        case EventVisibility.PUBLIC:
            return (
                <>
                    {
                        event.participationType === EventParticipationType.ATTENDING ? (
                            <ViewInCalendarButton>
                                Going
                            </ViewInCalendarButton>
                        ) :
                            event.participationType === EventParticipationType.HOSTING ? (
                                <ViewInCalendarButton>
                                    Hosting
                                </ViewInCalendarButton>
                            ) : (
                                <JoinEventButton eventId={event.id} />
                            )
                    }
                    <button
                        className={cx(
                            styles.button,
                            styles.button_share,
                        )}
                        onClick={handleShareEvent}
                    >
                        <IconShareOutline />
                        Share
                    </button>
                    <EventMoreActionsDrawer {...event}>
                        <IconEllipsisHorizontal />
                        More
                    </EventMoreActionsDrawer>
                </>
            );
        case EventVisibility.PRIVATE:
            return (
                <>
                    {
                        event.participationType === EventParticipationType.ATTENDING ? (
                            <ViewInCalendarButton>
                                Hosting
                            </ViewInCalendarButton>
                        ) : (
                            event.participationType === EventParticipationType.HOSTING ? (
                                <ViewInCalendarButton>
                                    Hosting
                                </ViewInCalendarButton>
                            ) : (
                                <button
                                    className={cx(
                                        styles.button,
                                        styles.button_primary,
                                        styles.button_accept,
                                    )}
                                >
                                    <IconCheck />
                                    Going
                                </button>
                            )
                        )
                    }
                    <button
                        className={cx(
                            styles.button,
                            styles.button_decline,
                        )}
                    >
                        <IconClose />
                        Decline
                    </button>
                    <button
                        className={cx(
                            styles.button,
                            styles.button_suggest,
                        )}
                    >
                        <IconCycle />
                        Suggest
                    </button>
                </>
            );
        default:
            return (
                <>
                    <JoinEventButton eventId={event.id} />
                    <button
                        className={cx(
                            styles.button,
                            styles.button_share,
                        )}
                        onClick={handleShareEvent}
                    >
                        <IconShareOutline />
                        Share
                    </button>
                    <EventMoreActionsDrawer {...event}>
                        <IconEllipsisHorizontal />
                        More
                    </EventMoreActionsDrawer>
                </>
            );
    }
};

const JoinEventButton = ({ eventId }: { eventId: string }) => {
    const router = useRouter();
    const {
        handleReserveTicket,
    } = useTicketReservation(
        eventId,
        {
            onTicketReserved: () => {
                router.refresh();
            },
        },
    );

    return (
        <button
            className={cx(
                styles.button,
                styles.button_primary,
                styles.button_join,
            )}
            onClick={handleReserveTicket}
        >
            <IconTicket />
            Join
        </button>
    );
};

const ViewInCalendarButton = ({ children }: PropsWithChildren) => {
    return (
        <Link
            href={"/calendar"}
            className={cx(
                styles.button,
                styles.button_calendar,
            )}
        >
            <IconCalendarOutline />
            { children }
        </Link>
    );
};