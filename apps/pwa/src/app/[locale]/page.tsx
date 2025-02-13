import { useTranslations } from "next-intl";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";

export default function Home() {

    const t = useTranslations();

    return (
        <div>
            <Drawer>
                <DrawerTrigger>
                    Drawer here
                </DrawerTrigger>
                <DrawerContent>
                    Next.js | {t("Index.title")}
                </DrawerContent>
            </Drawer>
        </div>
    );
}
