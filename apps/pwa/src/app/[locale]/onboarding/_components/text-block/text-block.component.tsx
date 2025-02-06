
import styles from "./styles.module.scss";

export namespace OnboardingTextBlock {
  export type Props = {
    title?: string;
    subtitle?: string;
  }
}

export const OnboardingTextBlock = ({
    title,
    subtitle,
}: OnboardingTextBlock.Props) => {
    return (
        <div className={styles.block}>
            <h1 className={styles.block__title}>
                { title }
            </h1>
            <p className={styles.block__subtitle}>
                { subtitle }
            </p>
        </div>
    );
};