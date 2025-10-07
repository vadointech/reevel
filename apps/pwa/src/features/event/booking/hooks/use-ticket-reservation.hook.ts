import { useMutation } from "@tanstack/react-query";
import { cancelTicketReservation, reserveTicket } from "@/api/booking/server";
import { useCallback } from "react";

type Params = {
    onTicketReserved: () => void;
    onTicketCancelled: () => void;
};

export function useTicketReservation(eventId: string, params: Partial<Params> = {}) {
    const reserverTicketMutation = useMutation({
        mutationFn: reserveTicket,
        onSuccess: () => {
            params.onTicketReserved?.();
        },
    });

    const cancelReservationMutation = useMutation({
        mutationFn: cancelTicketReservation,
        onSuccess: () => {
            params.onTicketCancelled?.();
        },
    });

    const handleReserveTicket = useCallback(() => {
        reserverTicketMutation.mutate({ eventId });
    }, []);

    const handleCancelTicketReservation = useCallback(() => {
        cancelReservationMutation.mutate({ eventId });
    }, []);

    return {
        handleReserveTicket,
        handleCancelTicketReservation,

        isReserving: reserverTicketMutation.isPending,
        isCancelling: cancelReservationMutation.isPending,
    };
}