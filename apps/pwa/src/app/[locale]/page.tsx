import { useTranslations } from "next-intl";

export default function Home() {

    const t = useTranslations();

    return (
        <div>
            Next.js | {t("Index.title")}
        </div>
    );
}
