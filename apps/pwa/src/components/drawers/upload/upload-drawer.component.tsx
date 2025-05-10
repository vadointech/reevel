"use client";

import { ComponentProps } from "react";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerTrigger,
    Header, TabsBody,
    TabsContent, TabsRoot,
} from "@/components/shared/_redesign";

export namespace UploadDrawer {
    export type Props = ComponentProps<"div">;
}

export const UploadDrawer = ({ ...props }: UploadDrawer.Props) => {
    return (
        <Drawer>
            <DrawerTrigger
                variant={"secondary-muted"}
                size={"small"}
            >
                Edit profile
            </DrawerTrigger>
            <DrawerBody>
                <DrawerContent>
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
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    );
};
