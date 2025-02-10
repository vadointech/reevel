import { LoginCarousel, LoginCarouselPagination } from "./_components";
import { Button, Container, Hint, Title } from "@/components/ui";
import { IconApple, IconGoogle } from "@/components/icons";

import styles from "./styles.module.scss";

export default async function Home() {

    return (
        <div className={styles.page}>
            <LoginCarousel />
            <Container className={styles.content}>
                <div className={styles.content__info}>
                    <Title
                      align="center"
                      size="3xl"
                      weight={500}
                      className={styles.content__title}
                    >
                        Make Every Moment Count
                    </Title>

                    <Hint
                        className={styles.content__subtitle}
                    >
                        Easily bring people together. Reevel turns simple moments into lasting memories.
                    </Hint>

                    <LoginCarouselPagination />
                </div>

                <div className={styles.content__buttons}>
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
