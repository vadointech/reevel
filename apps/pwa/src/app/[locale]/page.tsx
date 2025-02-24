"use client";

import { useTranslations } from "next-intl";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { sessionStore } from "@/stores/session.store";
import { Avatar, Container, Input } from "@/components/ui";

export default function Home() {

    const t = useTranslations();

    return (
        <div>
            <Drawer>
                <DrawerTrigger>
                    Drawer here  <br />
                    Session: {sessionStore.user?.id} {sessionStore.user?.email}
                </DrawerTrigger>
                <DrawerBody>
                    <div>

                    </div>
                    <DrawerContent>

                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </div>
    );
}
