"use client";

import { useTranslations } from "next-intl";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { sessionStore } from "@/modules/auth/session";
import { observer } from "mobx-react-lite";
import { Link } from "@/i18n/routing";

export default observer(function Home() {

    const t = useTranslations();

    return (
        <div>
            <Drawer>
                <DrawerTrigger>
                    Drawer here  <br />
                    <Link href={"/onboarding/photo"}>
                        Session: { sessionStore.user?.id } { sessionStore.user?.email }
                    </Link>
                </DrawerTrigger>
                <DrawerBody>
                    <div>
                        tabs
                    </div>
                    <DrawerContent>
                        Next.js | {t("Index.title")}
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </div>
    );
});
