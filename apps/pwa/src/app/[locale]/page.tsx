"use client";


import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Home() {

    const t = useTranslations();


    useEffect(() => {
        console.log("Da nu nah");
    }, []);

    return (
        <div>
          Next.js | {t("Index.title")}
        </div>
    );
}
