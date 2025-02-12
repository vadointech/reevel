import { getTranslations } from "next-intl/server";
import { Client } from "@/app/[locale]/client";

export default async function Home() {

    const t = await getTranslations();

    const joke = await fetch("https://official-joke-api.appspot.com/random_joke", {
        method: "GET",
    });
    const json = await joke.json();


    return (
        <div>
            Next.js | {t("Index.title")}

            <Client text={json.setup} />
        </div>
    );
}
