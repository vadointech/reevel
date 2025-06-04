import { getInitialInterests } from "@/api/interests";
import { headers } from "next/headers";
import { getCurrentUserInterests } from "@/api/user/get-interests";
import { InterestEntity } from "@/entities/interests";
import { ObjectUnique } from "@/utils/object-unique";
import { InterestsPickerScreen } from "@/components/screens";

export default async function CreateEventInterestsPage() {
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
    
    return <InterestsPickerScreen interests={interests} />;
}