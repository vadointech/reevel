import { CSSProperties } from "react";
import { Link } from "@/i18n/routing";

import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

import { ImageCropper } from "@/components/shared/cropper";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace UploadCropperView {
    export type Props = ImageCropper.Props & {
        callbackUrl: string;
        title: string;
        className?: string;
        style?: CSSProperties
    };
}

export const UploadCropperView = ({
    callbackUrl,
    title,
    children,
    className,
    style,
    ...props
}: UploadCropperView.Props) => {
    return (
        <div
            className={cx(styles.crop, className)}
            style={style}
        >
            <Header
                iconBefore={
                    <Link href={callbackUrl}>
                        <IconArrowLeft />
                    </Link>
                }
            >
                { title }
            </Header>

            <div className={styles.crop__cropper}>
                <ImageCropper {...props} />
            </div>

            <div className={styles.crop__buttons}>
                { children }
            </div>
        </div>
    );
};
