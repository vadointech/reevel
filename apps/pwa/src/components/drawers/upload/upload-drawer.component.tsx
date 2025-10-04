"use client";

import { ChangeEvent, ComponentProps } from "react";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/bottom-sheet";

import { TabsBody, TabsRoot } from "@/components/shared/tabs";

import { Header, Input } from "@/components/ui";
import { IconArrowLeft, IconPicture } from "@/components/icons";

import { UploadFileGrid, UploadFileItem } from "./primitives";

import { UserUploadsEntity } from "@/entities/uploads";
import { GetUserUploads } from "@/api/user/uploads";
import { BottomSheetExternalController } from "@/components/shared/bottom-sheet/types";

import styles from "./styles.module.scss";

export namespace UploadDrawer {
    export type Props = ComponentProps<"div"> & {
        title: string;
        uploads?: GetUserUploads.TOutput;
        onImagePick: (upload: UserUploadsEntity) => void;
        onImageDelete: (upload: UserUploadsEntity) => void;
        onFileSelect?: (e: ChangeEvent<HTMLInputElement>) => void;
        selectedImageUrl: string | undefined;
        controller?: BottomSheetExternalController;
        gridVariant?: UploadFileGrid.Variants["variant"]
    };
}

export const UploadDrawer = ({
    title,
    uploads = [],
    onImagePick,
    onImageDelete,
    selectedImageUrl,
    onFileSelect,
    controller,
    children,
    gridVariant,
}: UploadDrawer.Props) => {
    return (
        <BottomSheetRoot externalController={controller} handleOnly>
            <BottomSheetTrigger>
                {children}
            </BottomSheetTrigger>
            <BottomSheetPortal>
                <BottomSheetBody style={{ height: "100%" }}>
                    <BottomSheetContent className={styles.content}>
                        <BottomSheetHandle>
                            <Header
                                size={"small"}
                                iconBefore={<IconArrowLeft />}
                                onControlBeforeClick={() => controller?.current?.close()}
                                controlAfter={
                                    <Input.File
                                        label={"Upload"}
                                        accept={"image/png, image/jpeg, image/webp"}
                                        variant={"text-accent"}
                                        onChange={onFileSelect}
                                    />
                                }
                            >
                                {title}
                            </Header>
                        </BottomSheetHandle>
                        <TabsRoot>
                            <TabsBody
                                content={[
                                    {
                                        label: "Uploaded",
                                        value: (
                                            <UploadFileGrid variant={gridVariant}>
                                                <Input.File
                                                    label={"Upload"}
                                                    accept={"image/png, image/jpeg, image/webp"}
                                                    icon={<IconPicture />}
                                                    variant={"accent-muted"}
                                                    onChange={onFileSelect}
                                                />
                                                {
                                                    uploads.map(item => (
                                                        <UploadFileItem
                                                            key={item.id}
                                                            imageUrl={item.fileUrl}
                                                            selected={item.fileUrl === selectedImageUrl}
                                                            onClick={() => onImagePick(item)}
                                                            onDelete={() => onImageDelete(item)}
                                                        />
                                                    ))
                                                }
                                            </UploadFileGrid>
                                        ),
                                    },
                                    {
                                        label: "Art",
                                        value: <UploadFileGrid variant={gridVariant} />,
                                    },
                                    {
                                        label: "Marvel",
                                        value: <UploadFileGrid variant={gridVariant} />,
                                    },
                                    {
                                        label: "Anime",
                                        value: <UploadFileGrid variant={gridVariant} />,
                                    },
                                ]}
                            />
                        </TabsRoot>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};