"use client";
import CoinListing from "@/containers/CoinListing";
import { QueryClient, QueryClientProvider } from "react-query";

const STALE_TIME = 1000 * 10;

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: STALE_TIME, retry: 3 } },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CoinListing />
    </QueryClientProvider>
  );
}
