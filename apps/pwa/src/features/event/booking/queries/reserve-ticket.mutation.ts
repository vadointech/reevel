import { Mutation } from "@/lib/react-query";
import { reserveTicket, ReserveTicket } from "@/api/booking";

export const ReserveTicketMutation: Mutation<ReserveTicket.TInput, ReserveTicket.TOutput> = {
    mutationFn: (body) => reserveTicket({ body }).then(response => response.data),
};