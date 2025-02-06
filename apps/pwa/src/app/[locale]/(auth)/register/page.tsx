import { Hint } from "@/components/ui/hint/hint.component";
import { getTranslations } from "next-intl/server";

export default async function Home() {

    const t = await getTranslations();

    return (
        <div>
            <Hint>
                <p>You can select photo from the list below or add you own photo as profile picture </p>
            </Hint>
        </div>
    );
}
