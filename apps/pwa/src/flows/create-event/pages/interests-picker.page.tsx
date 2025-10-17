import { getInitialInterests } from "@/api/interests";

import { InterestsPickerProvider } from "@/features/interests/picker";
import { InterestsPickerContent } from "@/components/screens/interests-picker";
import { API_URL } from "@/config/env.config";

export namespace CreateEventInterestsPickerPage {
    export type Props = {
        callbackUrl: string;
    };
}

export async function CreateEventInterestsPickerPage({ callbackUrl }: CreateEventInterestsPickerPage.Props) {
    const { data: initialInterests } = await getInitialInterests({
        baseURL: API_URL,
        fallback: [],
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
