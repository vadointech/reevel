import { Button, Container } from "@/components/ui";

import styles from "./styles.module.scss";
import { ArrowBack } from "@/components/icons";
import { ProgressBar } from "@/components/shared";
import { OnboardingTextBlock } from "../_components";
import { DotIcon } from "../_components/dot-icon";


export default function Page() {
  return (
    <div className={styles.page}>
      <Container>
        <ProgressBar
          stepCount={4}
          currentStep={3}
          type="back"
        />
      </Container>

      <Container>
        <DotIcon />
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