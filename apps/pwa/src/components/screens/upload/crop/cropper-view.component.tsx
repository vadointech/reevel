import { ComponentProps } from "react";
import { Link } from "@/i18n/routing";

import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

import { ImageCropper } from "@/components/shared/cropper";

import styles from "./styles.module.scss";

export namespace UploadCropperView {
    export type Props = ComponentProps<"div"> & {
        callbackUrl: string;
    };
}

export const UploadCropperView = ({
    callbackUrl,
    children,
    ...props
}: UploadCropperView.Props) => {
    return (
        <div
            className={styles.crop}
            {...props}
        >
            <Header
                iconBefore={
                    <Link href={callbackUrl}>
                        <IconArrowLeft />
                    </Link>
                }
            >
                Upload poster
            </Header>

            <div className={styles.crop__cropper}>
                <ImageCropper aspect={390/510} />
            </div>

            <div className={styles.crop__buttons}>
                { children }
            </div>
        </div>
    );
};
