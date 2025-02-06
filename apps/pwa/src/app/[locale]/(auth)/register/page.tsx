import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function Home() {

    const t = await getTranslations();

    return (
        <div>
            <Button variant='default'>
                tests
            </Button>
        </div>
    );
}
