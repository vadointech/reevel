import cx from "classnames";
import {
    IconTicket,
    IconShare,
    IconEllipsisHorizontal,
    IconCheck,
    IconClose,
    IconCycle,
    IconCalendarOutline,
    IconSettings,
} from "@/components/icons";
import styles from "../styles.module.scss";
import { EventParticipationType, EventVisibility } from "@/entities/event";
import { useReserveTicket } from "@/features/event/booking/hooks";
import { Link } from "@/i18n/routing";
import { PropsWithChildren } from "react";

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
                    <IconShare />
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
                        <IconShare />
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
                        <IconShare />
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
    const {
        handleReserveTicket,
    } = useReserveTicket(eventId);

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