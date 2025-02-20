import { useTranslations } from "next-intl";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { sessionStore } from "@/stores/session.store";

export default function Home() {

    const t = useTranslations();

    return (
        <div>
            <Drawer>
                <DrawerTrigger>
                    Drawer here
                </DrawerTrigger>
                <DrawerBody>
                    <div>
                        tabs
                    </div>
                    <DrawerContent>
                        Next.js | {t("Index.title")} <br />
                        { sessionStore.user?.email }
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </div>
    );
}
