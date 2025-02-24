"use client";

import { useTranslations } from "next-intl";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { sessionStore } from "@/stores/session.store";
import { Avatar, Container, Input } from "@/components/ui";
import { RecommendationDrawer } from "@/components/drawers/recommendation-drawer";

export default function Home() {

    const t = useTranslations();

    return (
        <div>
            <RecommendationDrawer />
        </div>
    );
}
