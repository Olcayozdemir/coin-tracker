import { QueryClient } from "react-query";

export const STALE_TIME = 1000 * 10;

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: STALE_TIME, retry: 3 } },
});
