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
import { EventParticipationType, EventVisibility } from "@/entities/event";
import { useTicketReservation } from "@/features/event/booking/hooks";
import { Link, useRouter } from "@/i18n/routing";
import { PropsWithChildren } from "react";

import { EventMoreActionsDrawer } from "./more-drawer.componsent";

export type EventDrawerHeroButtonsProps = {
    eventId: string;
    visibility: EventVisibility;
    participationType: EventParticipationType | null;
    onShare?: () => void;
    onMore?: () => void;
    onDecline?: () => void;
    onSuggest?: () => void;
};

export const EventDrawerHeroButtons = ({
    visibility = EventVisibility.PUBLIC,
    participationType,
    eventId,
    onShare,
    onMore,
    onDecline,
    onSuggest,
}: EventDrawerHeroButtonsProps) => {

    if(participationType === EventParticipationType.HOSTING) {
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
                    onClick={onDecline}
                >
                    <IconSettings />
                    Settings
                </button>
            </>
        );
    }


    switch (visibility) {
        case EventVisibility.PUBLIC:
            return (
                <>
                    {
                        participationType === EventParticipationType.ATTENDING ? (
                            <ViewInCalendarButton>
                                Going
                            </ViewInCalendarButton>
                        ) :
                            participationType === EventParticipationType.HOSTING ? (
                                <ViewInCalendarButton>
                                    Hosting
                                </ViewInCalendarButton>
                            ) : (
                                <JoinEventButton eventId={eventId} />
                            )
                    }
                    <button
                        className={cx(
                            styles.button,
                            styles.button_share,
                        )}
                        onClick={onShare}
                    >
                        <IconShareOutline />
                        Share
                    </button>
                    <EventMoreActionsDrawer
                        eventId={eventId}
                        participationType={participationType}
                    >
                        <IconEllipsisHorizontal />
                        More
                    </EventMoreActionsDrawer>
                </>
            );
        case EventVisibility.PRIVATE:
            return (
                <>
                    {
                        participationType === EventParticipationType.ATTENDING ? (
                            <ViewInCalendarButton>
                                Hosting
                            </ViewInCalendarButton>
                        ) : (
                            participationType === EventParticipationType.HOSTING ? (
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
                        onClick={onDecline}
                    >
                        <IconClose />
                        Decline
                    </button>
                    <button
                        className={cx(
                            styles.button,
                            styles.button_suggest,
                        )}
                        onClick={onSuggest}
                    >
                        <IconCycle />
                        Suggest
                    </button>
                </>
            );
        default:
            return (
                <>
                    <JoinEventButton eventId={eventId} />
                    <button
                        className={cx(
                            styles.button,
                            styles.button_share,
                        )}
                        onClick={onShare}
                    >
                        <IconShareOutline />
                        Share
                    </button>
                    <button
                        className={cx(
                            styles.button,
                            styles.button_more,
                        )}
                        onClick={onMore}
                    >
                        <IconEllipsisHorizontal />
                        More
                    </button>
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