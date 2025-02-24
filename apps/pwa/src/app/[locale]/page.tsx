"use client";

import { useTranslations } from "next-intl";
import { RecommendationDrawer } from "@/components/drawers/recommendation-drawer";

export default function Home() {

    const t = useTranslations();

    return (
        <div>
            <RecommendationDrawer />
        </div>
    );
}
