import { useTranslations } from "next-intl";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";

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
                        Next.js | {t("Index.title")}
                    </DrawerContent>
                </DrawerBody>
            </Drawer>
        </div>
    );
}
