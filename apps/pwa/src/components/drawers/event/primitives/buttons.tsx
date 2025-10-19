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
import { Link } from "@/i18n/routing";
import { PropsWithChildren } from "react";

import { EventMoreActionsDrawer } from "./more-drawer.componsent";
import { useEventActions } from "@/features/event/hooks";
import { observer } from "mobx-react-lite";
import { useSessionContext } from "@/features/session";
import { useQuery } from "@tanstack/react-query";
import { GetEventParticipationStatusQuery } from "@/features/event/queries";


export namespace EventDrawerHeroButtons {
    export type Props = EventEntity;
    export type ButtonsBlockProps = {
        event: EventEntity;
        participationStatus?: EventParticipationType | null;
        authenticated?: boolean;
        handleShareEvent?: () => void;
    };
}

export const EventDrawerHeroButtons = observer((event: EventDrawerHeroButtons.Props) => {
    const {
        handleShareEvent,
    } = useEventActions(event);

    const session = useSessionContext();

    const { data: participationInfo } = useQuery({
        ...GetEventParticipationStatusQuery(event.id),
        enabled: session.store.authenticated,
        placeholderData: {
            eventId: event.id,
            participationStatus: null,
        },
    });

    if(participationInfo?.participationStatus === EventParticipationType.HOSTING) {
        return <HostButtons />;
    }


    switch (event.visibility) {
        case EventVisibility.PUBLIC:
            return (
                <PublicEventButtons
                    event={event}
                    authenticated={session.store.authenticated}
                    participationStatus={participationInfo?.participationStatus}
                    handleShareEvent={handleShareEvent}
                />
            );
        case EventVisibility.PRIVATE:
            return (
                <PrivateEventButtons
                    event={event}
                    authenticated={session.store.authenticated}
                    participationStatus={participationInfo?.participationStatus}
                    handleShareEvent={handleShareEvent}
                />
            );
        default:
            return (
                <PublicEventButtons
                    event={event}
                    authenticated={session.store.authenticated}
                    participationStatus={participationInfo?.participationStatus}
                    handleShareEvent={handleShareEvent}
                />
            );
    }
});

const JoinEventButton = ({ eventId }: { eventId: string }) => {
    const {
        handleReserveTicket,
    } = useTicketReservation(eventId);

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

const PublicEventButtons = ({
    event,
    participationStatus,
    authenticated,
    handleShareEvent,
}: EventDrawerHeroButtons.ButtonsBlockProps) => {
    return (
        <>
            {
                participationStatus === EventParticipationType.ATTENDING ? (
                    <ViewInCalendarButton>
                        Going
                    </ViewInCalendarButton>
                ) :
                    participationStatus === EventParticipationType.HOSTING ? (
                        <ViewInCalendarButton>
                            Hosting
                        </ViewInCalendarButton>
                    ) : (
                        authenticated ? <JoinEventButton eventId={event.id} /> : null
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
};

export const PrivateEventButtons = ({
    participationStatus,
}: EventDrawerHeroButtons.ButtonsBlockProps) => {
    return (
        <>
            {
                participationStatus === EventParticipationType.ATTENDING ? (
                    <ViewInCalendarButton>
                        Hosting
                    </ViewInCalendarButton>
                ) : (
                    participationStatus === EventParticipationType.HOSTING ? (
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
};

const HostButtons = () => {
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