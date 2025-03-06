"use client";

import { useTranslations } from "next-intl";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { useSessionStore } from "@/features/session";
import { observer } from "mobx-react-lite";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "@/api/auth/get-session";

export default observer(function Home() {

    const t = useTranslations();

    const sessionStore = useSessionStore();

    const { mutate, data } = useMutation({
        mutationFn: getSession,
    });


    console.log(data);

    return (
        <div>

            <Image
                width={100}
                height={100}
                src={sessionStore.user?.profile.picture || ""}
                alt={""}

                onClick={() => mutate({})}
            />

            <Drawer>
                <DrawerTrigger>
                    <br />
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
