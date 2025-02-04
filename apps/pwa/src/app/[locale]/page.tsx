import { getTranslations } from "next-intl/server";

export default async function Home() {

    const t = await getTranslations();

    return (
        <div>
          Next.js | {t("Index.title")}
        </div>
    );
}
