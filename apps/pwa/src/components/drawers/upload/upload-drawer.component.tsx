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
                            <TabsBody items={[
                                "Uploaded", "Art", "Marvel", "Anime",
                                "Uploaded", "Art", "Marvel", "Anime",
                            ]}>
                                <TabsContent>
                                    Uploaded
                                </TabsContent>
                                <TabsContent>
                                    Art
                                </TabsContent>
                                <TabsContent>
                                    Marvel
                                </TabsContent>
                                <TabsContent>
                                    Anime
                                </TabsContent>
                                <TabsContent>
                                    Uploaded
                                </TabsContent>
                                <TabsContent>
                                    Art
                                </TabsContent>
                                <TabsContent>
                                    Marvel
                                </TabsContent>
                                <TabsContent>
                                    Anime
                                </TabsContent>
                            </TabsBody>
                        </TabsRoot>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
};
