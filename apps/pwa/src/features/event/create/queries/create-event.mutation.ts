import { Mutation } from "@/lib/react-query";
import { createEvent, CreateEvent } from "@/api/event";

export const CreateEventMutation: Mutation<CreateEvent.TInput, CreateEvent.TOutput> = {
    mutationFn: (body) => createEvent({ body }).then(response => response.data),
};