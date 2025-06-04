import { PropsWithChildren } from "react";
import { CreateEventFormProvider } from "@/features/event/create";
import { getSession } from "@/api/auth/get-session";
import { headers } from "next/headers";

export default async function CreateEventLayout({ children }: PropsWithChildren) {
    const { data } = await getSession({
        nextHeaders: await headers(),
    });

    return (
        <CreateEventFormProvider
            defaultValues={{
                type: "public",
                host: data?.profile.fullName,
                title: "",
                description: "",
                interests: [],
                location: undefined as any,
                ticketsCount: "",
                ticketPrice: "",
                startDate: new Date(),
            }}
        >
            { children }
        </CreateEventFormProvider>
    );
}