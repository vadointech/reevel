import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { CancelTicketReservationMutation, ReserveTicketMutation } from "@/features/event/booking/queries";

type Params = {
    onTicketReserved: () => void;
    onTicketCancelled: () => void;
};

export function useTicketReservation(eventId: string, params: Partial<Params> = {}) {
    const reserverTicketMutation = useMutation({
        ...ReserveTicketMutation,
        onSuccess: () => {
            params.onTicketReserved?.();
        },
    });

    const cancelReservationMutation = useMutation({
        ...CancelTicketReservationMutation,
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