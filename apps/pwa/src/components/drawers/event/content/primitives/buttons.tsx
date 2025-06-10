import cx from "classnames";
import {
    IconTicket, IconShare, IconEllipsisHorizontal, IconCheck, IconClose,
    IconSettings,
    IconCycle,
} from "@/components/icons";
import styles from "../styles.module.scss";
import { Variant } from "../../types";

export type EventDrawerHeroButtonsProps = {
    variant: Variant;
    onJoin?: () => void;
    onShare?: () => void;
    onMore?: () => void;
    onDecline?: () => void;
    onSuggest?: () => void;
};

export const EventDrawerHeroButtons = ({
    variant = "public",
    onJoin,
    onShare,
    onMore,
    onDecline,
    onSuggest,
}: EventDrawerHeroButtonsProps) => {
    switch (variant) {
        case "public":
            return (
                <>
                    <button
                        className={cx(
                            styles.hero__button,
                            styles.hero__button_primary,
                            styles.hero__button_primary_filled,
                            styles.hero__button_join,
                        )}
                        onClick={onJoin}
                    >
                        <IconTicket />
                        Join
                    </button>
                    <button
                        className={cx(
                            styles.hero__button,
                            styles.hero__button_share,
                        )}
                        onClick={onShare}
                    >
                        <IconShare />
                        Share
                    </button>
                    <button
                        className={cx(
                            styles.hero__button,
                            styles.hero__button_more,
                        )}
                        onClick={onMore}
                    >
                        <IconEllipsisHorizontal />
                        More
                    </button>
                </>
            );
        case "private":
            return (
                <>
                    <button
                        className={cx(
                            styles.hero__button,
                            styles.hero__button_primary,
                            styles.hero__button_primary_outlined,
                            styles.hero__button_accept,
                        )}
                        onClick={onJoin}
                    >
                        <IconCheck />
                        Going
                    </button>
                    <button
                        className={cx(
                            styles.hero__button,
                            styles.hero__button_decline,
                        )}
                        onClick={onDecline}
                    >
                        <IconClose />
                        Decline
                    </button>
                    <button
                        className={cx(
                            styles.hero__button,
                            styles.hero__button_suggest,
                        )}
                        onClick={onSuggest}
                    >
                        <IconCycle />
                        Suggest
                    </button>
                </>
            );
        case "host":
            return (
                <>
                    <button
                        className={cx(
                            styles.hero__button,
                            styles.hero__button_primary,
                            styles.hero__button_primary_outlined,
                        )}
                        onClick={onJoin}
                    >
                        <IconShare />
                        Invite guests
                    </button>
                    <button
                        className={cx(
                            styles.hero__button,
                            styles.hero__button_settings,
                        )}
                        onClick={onDecline}
                    >
                        <IconSettings />
                        Settings
                    </button>
                </>);
        default:
            return null;
    }
};