"use client";

import { ComponentProps } from "react";
import {
    Button,
    Header, TabsBody,
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
import { UploadFileButton, UploadFileGrid } from "./primitives";
import { ScrollArea } from "@/components/shared/_redesign/scroll-area/scroll-area.component";
import { IconArrowLeft } from "@/components/icons";

import styles from "./styles.module.scss";

export namespace UploadDrawer {
    export type Props = ComponentProps<"div">;
}

export const UploadDrawer = ({ children }: UploadDrawer.Props) => {
    return (
        <BottomSheetRoot handleOnly>
            <BottomSheetTrigger>
                { children }
            </BottomSheetTrigger>
            <BottomSheetPortal>
                <BottomSheetBody>
                    <BottomSheetContent className={styles.content}>
                        <BottomSheetHandle>
                            <Header
                                size={"small"}
                                iconBefore={<IconArrowLeft />}
                                controlAfter={
                                    <Button variant={"text-area-accent"}>
                                        Upload
                                    </Button>
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
                                        <UploadFileGrid variant={"vertical"}>
                                            <UploadFileButton />
                                        </UploadFileGrid>
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent>
                                    <ScrollArea>
                                        <UploadFileGrid variant={"vertical"} />
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent>
                                    <ScrollArea>
                                        <UploadFileGrid variant={"vertical"} />
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent>
                                    <ScrollArea>
                                        <UploadFileGrid variant={"vertical"} />
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
