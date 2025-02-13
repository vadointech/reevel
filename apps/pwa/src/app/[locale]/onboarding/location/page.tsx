import { Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { ArrowBack } from "@/components/icons";
import { ProgressBar } from "@/components/shared";
import { OnboardingTextBlock } from "../_components";
import { Lollypop } from "../_components/lollypop-circle";


export default function Page() {
  return (
    <div className={styles.page}>
      <Container>
        <ProgressBar
          stepCount={4}
          currentStep={3}
          controlLeft={<ArrowBack className={styles.controlLeft} strokeWidth={0.3} />}
        />
      </Container>

      <Container>
        <Lollypop />
        <OnboardingTextBlock
          title={"What is Your Location?"}
          subtitle={"To find nearby events share your location with us"}
          className={styles.page__text}
        />
      </Container>
      <Container className={styles.page__buttons}>
        <Button
          variant={"primary"}
          iconAfter={<ArrowBack />}
        >
          Next step
        </Button>
      </Container>
    </div>
  );
}