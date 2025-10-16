import { UseMutationOptions } from "@tanstack/react-query";
import { FetcherErrorResponse } from "@/lib/fetcher/types";

export type Mutation<TInput, TOutput> = UseMutationOptions<TOutput, FetcherErrorResponse, TInput>;