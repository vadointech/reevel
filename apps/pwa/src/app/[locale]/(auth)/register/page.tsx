import { CarouselLayout } from "./_components/carousel";
import { Button, Container, Dots, Hint, Title } from "@/components/ui";
import { IconApple, IconGoogle } from "@/components/icons";
import styles from "./styles.module.scss";

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
                    <Button
                        variant="default"
                        iconColor={"initial"}
                        iconBefore={<IconGoogle />}
                    >
                        Sign in with Google
                    </Button>
                    <Button
                        variant="primary"
                        iconColor={"initial"}
                        iconBefore={<IconApple />}
                    >
                        Sign in with Apple
                    </Button>
                </div>
            </Container>
        </div>
    );
}
