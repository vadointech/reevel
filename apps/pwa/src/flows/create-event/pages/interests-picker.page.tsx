import { getInitialInterests } from "@/api/interests/server";
import { getCurrentUserInterests } from "@/api/user/server";

import { InterestsPickerProvider } from "@/features/interests/picker";
import { InterestsPickerContent } from "@/components/screens/interests-picker";

import { ObjectUnique } from "@/utils/object";

export namespace CreateEventInterestsPickerPage {
    export type Props = {
        callbackUrl: string;
    };
}

export async function CreateEventInterestsPickerPage({ callbackUrl }: CreateEventInterestsPickerPage.Props) {
    const initialInterests = await getInitialInterests();
    const currentInterests = await getCurrentUserInterests();

    const interests = [
        ...new ObjectUnique([
            ...initialInterests,
            ...currentInterests,
        ], "slug"),
    ];

    return (
        <InterestsPickerProvider
            interests={interests}
            syncFormField={"interests"}
            callbackUrl={callbackUrl}
        >
            <InterestsPickerContent />
        </InterestsPickerProvider>
    );
};
