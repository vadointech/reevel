"use client";

import { Button } from "@/components/ui";
import { IconArrowNext } from "@/components/icons";
import { useOnboardingUpdate } from "@/features/onboarding/hooks";

export namespace OnboardingNextStepButton {
    export type Props = Button.Props & {
        revalidateQueryOnSuccess?: string[]
    };
}

export const OnboardingNextStepButton = ({ revalidateQueryOnSuccess, ...props }: OnboardingNextStepButton.Props) => {

    const {
        isUpdating,
        handleUpdate,
    } = useOnboardingUpdate({ revalidateQueryOnSuccess });

    return (
        <Button
            variant={"accent"}
            arrowAfter={<IconArrowNext />}
            onClick={handleUpdate}
            loading={isUpdating}
            {...props}
        />
    );
};