import { PropsWithChildren } from "react";
import { CreateEventFormProvider } from "@/features/event/create";

export default function CreateEventLayout({ children }: PropsWithChildren) {
    return (
        <CreateEventFormProvider
            defaultValues={{
                title: null,
                description: null,
                interests: [],
                ticketsCount: null,
                ticketPrice: null,
                startDate: new Date(),
                startTime: null,
                endTime: null,
            }}
        >
            { children }
        </CreateEventFormProvider>
    );
}