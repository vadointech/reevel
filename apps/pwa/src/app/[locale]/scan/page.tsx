import { Metadata } from "next";
import Image from "next/image";

import styles from "./styles.module.scss";

import qrCode from "@/../public/assets/qr.png";
import render from "@/../public/assets/render.png";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
    alternates: {
        canonical: "/scan",
    },

    robots: {
        index: false,
        follow: true,
        nocache: true,
    },
};

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.page__content}>
                <h1 className={styles.page__title}>
                    Reevel Lives on Mobile
                </h1>
                <p className={styles.page__subtitle}>
                    See what’s happening around you, create your own events, and meet friends in real life.
                </p>
                <div className={styles.page__code}>
                    <Image
                        width={200}
                        height={200}
                        src={qrCode}
                        alt={"qr-code"}
                    />
                </div>
            </div>
            <div className={styles.page__hero}>
                <Image
                    fill
                    src={render}
                    alt={"render"}
                />
            </div>
        </div>
    );
}