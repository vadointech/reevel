import { headers } from "next/headers";
import { getGoogleOAuthLink } from "@/api/auth/get-google-oauth-link";

import { IconApple, IconGoogle } from "@/components/icons";
import { Button, ButtonsBlock, Container } from "@/components/ui";
import { AuthCarousel } from "@/flows/auth/modules/carousel";

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
                    <h1 className={styles.content__title}>
                        Make Every Moment Count
                    </h1>

                    <p className={styles.content__subtitle}>
                        Easily bring people together. Reevel turns simple moments into lasting memories.
                    </p>
                </div>

                <ButtonsBlock container={false}>
                    <Button
                        variant={"secondary-muted"}
                        iconBefore={<IconGoogle />}
                        href={data?.link}
                    >
                        Sign in with Google
                    </Button>
                    <Button
                        iconBefore={<IconApple />}
                    >
                        Sign in with Apple
                    </Button>
                </ButtonsBlock>
            </Container>
        </div>
    );
}
