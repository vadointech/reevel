import { useMutation } from "@tanstack/react-query";
import { reserveTicket } from "@/api/booking/server";
import { useCallback } from "react";

export function useReserveTicket(eventId: string) {

    const reserverTicketMutation = useMutation({
        mutationFn: reserveTicket,
        onSuccess: (data) => {

        },
    });

    const handleReserveTicket = useCallback(() => {
        reserverTicketMutation.mutate({ eventId });
    }, []);

    return {
        handleReserveTicket,
        isReserving: reserverTicketMutation.isPending,
    };
}