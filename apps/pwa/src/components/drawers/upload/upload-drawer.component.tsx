"use client";

import { ComponentProps } from "react";
import {
    Header, Input, TabsBody,
    TabsContent, TabsRoot,
} from "@/components/shared/_redesign";
import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/_redesign/bottom-sheet";
import { UploadFileGrid } from "./primitives";
import { ScrollArea } from "@/components/shared/_redesign/scroll-area/scroll-area.component";
import { IconArrowLeft, IconPicture } from "@/components/icons";

import { UserUploadsEntity } from "@/entities/uploads";
import { BottomSheetExternalController } from "@/components/shared/_redesign/bottom-sheet/types";
import { UploadFileItem } from "@/components/drawers/upload/primitives/upload-item.component";
import { GetUserUploads } from "@/api/user/uploads";

import styles from "./styles.module.scss";
import { useRouter } from "@/i18n/routing";
import { useImageUploader } from "@/features/uploader/image/hooks";

export namespace UploadDrawer {
    export type Props = ComponentProps<"div"> & {
        uploads?: GetUserUploads.TOutput;
        onImagePick: (upload: UserUploadsEntity) => void;
        onImageDelete: (upload: UserUploadsEntity) => void;
        selectedImageUrl: string | undefined;
        cropperPageUrl?: string;
        onFileSelected?: (src: string) => void;
        controller?: BottomSheetExternalController;
        gridVariant?: UploadFileGrid.Variants["variant"]
    };
}

export const UploadDrawer = ({
    uploads = [],
    onImagePick,
    onImageDelete,
    selectedImageUrl,
    controller,
    children,
    cropperPageUrl,
    gridVariant,
    onFileSelected,
}: UploadDrawer.Props) => {
    const router = useRouter();

    const { handleSelectFile } = useImageUploader({
        onFileSelected: (src) => {
            onFileSelected?.(src);
            if(cropperPageUrl) router.push(cropperPageUrl);
        },
    });

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
                                        onChange={handleSelectFile}
                                    />
                                }
                            >
                                Event poster
                            </Header>
                        </BottomSheetHandle>
                        <TabsRoot>
                            <TabsBody
                                items={[
                                    "Uploaded", "Art", "Marvel", "Anime",
                                ]}
                            >
                                <TabsContent>
                                    <ScrollArea>
                                        <UploadFileGrid variant={gridVariant}>
                                            <div>
                                                <Input.File
                                                    label={"Upload"}
                                                    accept={"image/png, image/jpeg, image/webp"}
                                                    icon={<IconPicture />}
                                                    variant={"accent-muted"}
                                                    onChange={handleSelectFile}
                                                />
                                            </div>
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
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent>
                                    <ScrollArea>
                                        <UploadFileGrid variant={gridVariant} />
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent>
                                    <ScrollArea>
                                        <UploadFileGrid variant={gridVariant} />
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent>
                                    <ScrollArea>
                                        <UploadFileGrid variant={gridVariant} />
                                    </ScrollArea>
                                </TabsContent>
                            </TabsBody>
                        </TabsRoot>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};