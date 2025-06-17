import { IconLogoInstagram, IconLogoTelegram, IconLogoTwitch } from "@/components/icons";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace ProfileHeroLinks {
    export type Props = never;
}

export const ProfileHeroLinks = () => {
    return (
        <div className={styles.hero__links}>
            <div className={cx(styles.hero__link, styles.hero__link_twitch)}>
                <IconLogoTwitch />
            </div>
            <div className={cx(styles.hero__link, styles.hero__link_telegram)}>
                <IconLogoTelegram />
            </div>
            <div className={cx(styles.hero__link, styles.hero__link_inst)}>
                <IconLogoInstagram />
            </div>
        </div>
    );
};
