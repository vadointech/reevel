import { PropsWithChildren } from "react";
import { CreateEventFormProvider } from "@/features/event/create";

export default function CreateEventLayout({ children }: PropsWithChildren) {
    return (
        <CreateEventFormProvider
            defaultValues={{
                title: "",
                description: "",
                interests: [],
                location: {
                    title: undefined,
                    coordinates: [],
                },
                ticketsCount: "",
                ticketPrice: "",
                startDate: new Date(),
            }}
        >
            { children }
        </CreateEventFormProvider>
    );
}