import { ReactNode } from "react";
import { Link } from "@/i18n/routing";

import { ButtonsBlock, Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

import { ImageCropper } from "@/components/shared/cropper";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace UploadCropperView {
    export type Props = ImageCropper.Props & {
        callbackUrl: string;
        title: string;
        className?: string;
        children?: ReactNode;
    };
}

export const UploadCropperView = ({
    callbackUrl,
    title,
    children,
    className,
    ...props
}: UploadCropperView.Props) => {
    return (
        <div
            className={cx(styles.crop, className)}
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

            <ButtonsBlock>
                { children }
            </ButtonsBlock>
        </div>
    );
};
