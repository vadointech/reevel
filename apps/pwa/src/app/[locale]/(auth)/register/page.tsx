import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { getTranslations } from "next-intl/server";
import movie_img from "@/../public/assets/temp/test.jpg";
import { CarouselCard } from "@/components/ui/carousel-card/carousel-card.component";



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
                <CarouselCard img={movie_img} />
            </Container>
        </div>
    );
}
