"use client";

import { Button } from "@/components/ui";
import { ArrowBack } from "@/components/icons";
import { useEventStore } from "@/features/event";
import { observer } from "mobx-react-lite";
import { isFormValid } from "@/utils/ifFormValid";

export const NextStepButton = observer(() => {
    const eventStore = useEventStore();


    return (
        <Button
            variant="primary"
            iconAfter={<ArrowBack />}
            href="event/preview"
            disabled={!isFormValid()}
        >
            Next step
        </Button>
    );
}); 