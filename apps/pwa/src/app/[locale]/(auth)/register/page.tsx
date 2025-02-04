import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { getTranslations } from "next-intl/server";

export default async function Home() {

    const t = await getTranslations();

    return (
        <div>
            <Container>
                <Title
                    title={'Make Every Moment Count'}
                    size="3xl"
                    weight={500}
                    align="center"
                />
            </Container>
        </div>
    );
}
