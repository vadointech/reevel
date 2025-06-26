import { PropsWithParams } from "@/types/common";
import { EventAttendeePublicViewPage } from "@/flows/event-view/pages";

export default async function Page({ params }: PropsWithParams<{ slug: string }>) {
    const { slug } = await params;
    return (
        <EventAttendeePublicViewPage eventId={slug} callbackUrl={"/discover"} />
    );
}