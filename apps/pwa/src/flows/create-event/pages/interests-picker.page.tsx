import { headers } from "next/headers";
import { getInitialInterests } from "@/api/interests";
import { getCurrentUserInterests } from "@/api/user/get-interests";
import { ObjectUnique } from "@/utils/object-unique";
import { InterestEntity } from "@/entities/interests";
import { InterestsPickerProvider } from "@/features/interests/picker";
import { InterestsPickerContent } from "@/components/screens";

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
