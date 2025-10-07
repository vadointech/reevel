"use server";

import { getAccessToken } from "@/api/server";

import * as ReserveTicketRequest from "./reserve-ticket";

export async function reserveTicket(input: ReserveTicketRequest.ReserveTicket.TInput) {
    const accessToken = await getAccessToken();
  
    const response = await ReserveTicketRequest.reserveTicket({
        authorization: {
            method: "Bearer",
            token: accessToken,
        },
        body: input,
    });

    console.log(response);

    return response.data;
}