import { getGoogleOAuthLink } from "@/api/auth/get-google-oauth-link";
import { headers } from "next/headers";
import { Button, Container, Hint, Title } from "@/components/ui";
import { IconApple, IconGoogle } from "@/components/icons";
import { AuthCarousel, AuthCarouselPagination } from "@/flows/auth/modules/carousel";

import styles from "../styles/login-page.module.scss";

export namespace AuthLoginPage {
    export type Props = never;
}

export async function AuthLoginPage() {

    const { data } = await getGoogleOAuthLink({
        nextHeaders: await headers(),
    });

    return (
        <div className={styles.page}>
            <AuthCarousel />
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

                    <AuthCarouselPagination />
                </div>

                <div className={styles.content__buttons}>
                    <Button
                        variant="default"
                        iconColor={"initial"}
                        iconBefore={<IconGoogle />}
                        href={data?.link}
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
