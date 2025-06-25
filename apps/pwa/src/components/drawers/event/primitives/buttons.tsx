import cx from "classnames";
import {
    IconTicket, IconShare, IconEllipsisHorizontal, IconCheck, IconClose,
    IconSettings,
    IconCycle,
} from "@/components/icons";
import styles from "../styles.module.scss";
import { EventVisibility } from "@/entities/event";

export type EventDrawerHeroButtonsProps = {
    visibility?: EventVisibility;
    onJoin?: () => void;
    onShare?: () => void;
    onMore?: () => void;
    onDecline?: () => void;
    onSuggest?: () => void;
};

export const EventDrawerHeroButtons = ({
    visibility = EventVisibility.PUBLIC,
    onJoin,
    onShare,
    onMore,
    onDecline,
    onSuggest,
}: EventDrawerHeroButtonsProps) => {
    switch (visibility) {
        case EventVisibility.PUBLIC:
            return (
                <>
                    <button
                        className={cx(
                            styles.button,
                            styles.button_primary,
                            styles.button_join,
                        )}
                        onClick={onJoin}
                    >
                        <IconTicket />
                        Join
                    </button>
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
                    <button
                        className={cx(
                            styles.button,
                            styles.button_primary,
                            styles.button_accept,
                        )}
                        onClick={onJoin}
                    >
                        <IconCheck />
                        Going
                    </button>
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
        case EventVisibility.HOST:
            return (
                <>
                    <button
                        className={cx(
                            styles.button,
                            styles.button_primary,
                            styles.button_share,
                        )}
                        onClick={onJoin}
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
        default:
            return null;
    }
};