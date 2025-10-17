import { getInitialInterests } from "@/api/interests";

import { InterestsPickerProvider } from "@/features/interests/picker";
import { InterestsPickerContent } from "@/components/screens/interests-picker";
import { API_URL } from "@/config/env.config";

export namespace EditProfileInterestsPickerPage {
    export type Props = {
        callbackUrl: string;
    };
}

export async function EditProfileInterestsPickerPage({ callbackUrl }: EditProfileInterestsPickerPage.Props) {
    const { data: initialInterests } = await getInitialInterests({
        fallback: [],
        baseURL: API_URL,
    });

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
