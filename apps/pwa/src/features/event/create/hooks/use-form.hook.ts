import { CreateEventFormSchemaValues } from "@/features/event/create";
import { useRouter } from "@/i18n/routing";

export function useCreateEventForm() {
    const router = useRouter();
    const onSubmit = (values: CreateEventFormSchemaValues) => {
        // TODO: HTTP Request
        console.log(values);
        router.push("/event/create/preview");
    };

    return {
        onSubmit,
    };
}