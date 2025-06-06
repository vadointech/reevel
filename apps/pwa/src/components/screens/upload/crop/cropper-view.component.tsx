import { ComponentProps } from "react";
import { Link } from "@/i18n/routing";

import { Header } from "@/components/shared/_redesign";
import { IconArrowLeft } from "@/components/icons";
import { ImageCropper } from "@/components/shared/_redesign/cropper";
import { CropControlsButtons } from "./primitives";

import styles from "./styles.module.scss";

export namespace UploadCropperView {
    export type Props = ComponentProps<"div">;
}

export const UploadCropperView = ({ ...props }: UploadCropperView.Props) => {
    return (
        <div
            className={styles.crop}
            {...props}
        >
            <Header
                iconBefore={
                    <Link href={"/event/create/preview"}>
                        <IconArrowLeft />
                    </Link>
                }
            >
                Upload poster
            </Header>

            <div className={styles.crop__cropper}>
                <ImageCropper aspect={390/510} />
            </div>

            <CropControlsButtons />
        </div>
    );
};
