import { getInitialInterests } from "@/api/interests/server";

import { InterestsPickerProvider } from "@/features/interests/picker";
import { InterestsPickerContent } from "@/components/screens/interests-picker";

export namespace EditProfileInterestsPickerPage {
    export type Props = {
        callbackUrl: string;
    };
}

export async function EditProfileInterestsPickerPage({ callbackUrl }: EditProfileInterestsPickerPage.Props) {
    const initialInterests = await getInitialInterests();

    return (
        <InterestsPickerProvider
            interests={initialInterests}
            syncFormField={"interests"}
            callbackUrl={callbackUrl}
        >
            <InterestsPickerContent />
        </InterestsPickerProvider>
    );
};
