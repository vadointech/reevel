import styles from "./styles.module.scss";
import { Check, Navigation } from "@/components/icons";

export namespace OnboardingLocationItem {
    export type Data = {
        city: string,
        country: string,
    };
    export type Props = {
        data: Data;
        selected?: boolean
    };
}

export const OnboardingLocationItem = ({ data, selected }: OnboardingLocationItem.Props) => {
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.container__city}>
                    <Navigation />
                    <p>{ data.city }</p>
                </div>
                <p className={styles.container__contry}>{ data.country }</p>
            </div>
            {
                selected && (
                    <div className={styles.container__check}>
                        <Check width={12} height={8} />
                    </div>
                )
            }
        </div>
    );
};
