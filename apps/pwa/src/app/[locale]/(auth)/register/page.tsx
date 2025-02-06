import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icons";
import { getTranslations } from "next-intl/server";

export default async function Home() {

    const t = await getTranslations();

    return (
        <div>
            <Button variant='primary'>
                <GoogleIcon />
                Sign in with Google
            </Button>
        </div>
    );
}
