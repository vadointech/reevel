import { CreateEventFormSchemaValues } from "@/features/event/create";

export function useCreateEventForm() {
    const onSubmit = (values: CreateEventFormSchemaValues) => {
    
    };

    return {
        onSubmit,
    };
}