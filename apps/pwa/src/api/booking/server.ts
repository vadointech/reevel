"use server";

import { getAccessToken } from "@/api/server";

import * as ReserveTicketRequest from "./reserve-ticket";
import * as CancelTicketReservationRequest from "./cancel-reservation";

export async function reserveTicket(input: ReserveTicketRequest.ReserveTicket.TInput) {
    const accessToken = await getAccessToken();
  
    const response = await ReserveTicketRequest.reserveTicket({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    return response.data;
}

export async function cancelTicketReservation(input: CancelTicketReservationRequest.CancelTicketReservation.TInput) {
    const accessToken = await getAccessToken();

    const response = await CancelTicketReservationRequest.cancelTicketReservation({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    return response.data;
}