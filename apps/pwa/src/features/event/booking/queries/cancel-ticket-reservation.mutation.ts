import { Mutation } from "@/lib/react-query";
import { cancelTicketReservation, CancelTicketReservation } from "@/api/booking";

export const CancelTicketReservationMutation: Mutation<CancelTicketReservation.TInput, CancelTicketReservation.TOutput> = {
    mutationFn: (body) => cancelTicketReservation({ body }).then(response => response.data),
};