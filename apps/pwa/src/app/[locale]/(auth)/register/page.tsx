import { getTranslations } from "next-intl/server";
import { CarouselLayout } from "./_components/carousel";
import styles from "./styles.module.scss";
import { Title } from "@/components/ui/title";
import { Hint } from "@/components/ui/hint/hint.component";
import { Container } from "@/components/ui/container";
import { Dots } from "@/components/ui/dots";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icons";
import AppleIcon from "@/components/ui/icons/apple-icon";

export default async function Home() {

    return (
        <div className={styles.wrapper}>
            <CarouselLayout />
            <Container className={styles.auth}>
                <div className={styles.auth__info}>
                    <div className={styles.auth__text}>
                        <Title
                            align="center"
                            size="3xl"
                            weight={500}
                        >
                            Make Every Moment Count
                        </Title>
                        <Hint>
                            Easily bring people together. Reevel turns simple moments into lasting memories.
                        </Hint>
                    </div>
                    <Dots />
                </div>

                <div className={styles.auth__buttons}>
                    <Button variant="default">
                        <GoogleIcon />
                        Sign in with Google
                    </Button>
                    <Button variant="primary">
                        <AppleIcon />
                        Sign in with Apple
                    </Button>
                </div>
            </Container>
        </div>
    );
}
