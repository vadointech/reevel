import { headers } from "next/headers";

import { getInitialInterests } from "@/api/interests/server";
import { getCurrentUserInterests } from "@/api/user/server";

import { InterestsPickerProvider } from "@/features/interests/picker";
import { InterestsPickerContent } from "@/components/screens/interests-picker";

import { ObjectUnique } from "@/utils/object-unique";
import { InterestEntity } from "@/entities/interests";

export namespace CreateEventInterestsPickerPage {
    export type Props = {
        callbackUrl: string;
    };
}

export async function CreateEventInterestsPickerPage({ callbackUrl }: CreateEventInterestsPickerPage.Props) {
    const { data: initialInterests } = await getInitialInterests({
        nextHeaders: await headers(),
    });

    const { data: userInterests } = await getCurrentUserInterests({
        nextHeaders: await headers(),
    });

    const interests = [
        ... new ObjectUnique<InterestEntity>(
            [
                ...(userInterests || []).map(item => item.interest),
                ...(initialInterests || []),
            ], "slug",
        ),
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
