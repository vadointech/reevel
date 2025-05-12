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
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetTrigger,
} from "@/components/shared/_redesign/bottom-sheet";
import { UploadFileButton, UploadFileGrid } from "./primitives";

export namespace UploadDrawer {
    export type Props = ComponentProps<"div">;
}

export const UploadDrawer = ({ children }: UploadDrawer.Props) => {
    return (
        <BottomSheetRoot>
            <BottomSheetTrigger>
                { children }
            </BottomSheetTrigger>
            <BottomSheetPortal>
                <BottomSheetBody>
                    <BottomSheetContent>
                        <Header
                            size={"small"}
                            controlAfter={
                                <Button variant={"text-accent"}>
                                    Upload
                                </Button>
                            }
                        >
                            Event poster
                        </Header>
                        <TabsRoot>
                            <TabsBody
                                items={[
                                    "Uploaded", "Art", "Marvel", "Anime",
                                ]}
                            >
                                <TabsContent>
                                    <UploadFileGrid variant={"vertical"}>
                                        <UploadFileButton />
                                    </UploadFileGrid>
                                </TabsContent>
                                <TabsContent>
                                    <UploadFileGrid variant={"vertical"} />
                                </TabsContent>
                                <TabsContent>
                                    <UploadFileGrid variant={"vertical"} />
                                </TabsContent>
                                <TabsContent>
                                    <UploadFileGrid variant={"vertical"} />
                                </TabsContent>
                            </TabsBody>
                        </TabsRoot>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
