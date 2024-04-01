"use client";
import { queryClient } from "@/configs/general";
import CoinListing from "@/containers/CoinListing";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CoinListing />
    </QueryClientProvider>
  );
}
