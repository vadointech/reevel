import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { CancelTicketReservationMutation, ReserveTicketMutation } from "@/features/event/booking/queries";
import { GetEventParticipationStatusQuery } from "@/features/event/queries";
import { GetEventParticipationStatus } from "@/api/event";
import { EventParticipationType } from "@/entities/event";
import { GetUserCalendarEventsQuery } from "@/features/calendar/queries";

type Params = {
    onTicketReserved: () => void;
    onTicketCancelled: () => void;
};

export function useTicketReservation(eventId: string, params: Partial<Params> = {}) {
    const queryClient = useQueryClient();
    const reserverTicketMutation = useMutation({
        ...ReserveTicketMutation,
        onSuccess: () => {
            queryClient.setQueryData<GetEventParticipationStatus.TOutput>(
                GetEventParticipationStatusQuery.queryKey([eventId]),
                { eventId, participationStatus: EventParticipationType.ATTENDING },
            );
            queryClient.invalidateQueries({
                queryKey: GetUserCalendarEventsQuery.queryKey(),
            });
            params.onTicketReserved?.();
        },
    });

    const cancelReservationMutation = useMutation({
        ...CancelTicketReservationMutation,
        onSuccess: () => {
            queryClient.setQueryData<GetEventParticipationStatus.TOutput>(
                GetEventParticipationStatusQuery.queryKey([eventId]),
                { eventId, participationStatus: null },
            );
            queryClient.invalidateQueries({
                queryKey: GetUserCalendarEventsQuery.queryKey(),
            });
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