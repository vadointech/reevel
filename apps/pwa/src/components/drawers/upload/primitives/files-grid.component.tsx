import { ComponentProps } from "react";

import { UploadFileItem } from "./upload-item.component";
import { UserUploadsEntity } from "@/entities/uploads";
import { GetUserUploads } from "../../../../api/user/uploads/get-uploads";

import styles from "../styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";

const fileGrid = cva(styles.upload__grid, {
    variants: {
        variant: {
            vertical: styles.upload__grid_vertical,
            horizontal: styles.upload__grid_horizontal,
        },
    },
    defaultVariants: {
        variant: "vertical",
    },
});

export namespace UploadFileGrid {
    export type Props = ComponentProps<"div"> & VariantProps<typeof fileGrid>;
}

export const UploadFileGrid = ({
    variant,
    className,
    children,
    ...props
}: UploadFileGrid.Props) => {

    return (
        <div
            className={fileGrid({ variant, className })}
            {...props}
        >
            { children }
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem selected image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
            {/*<UploadFileItem image={"/assets/temp/poster6.png"} />*/}
        </div>
    );
};
