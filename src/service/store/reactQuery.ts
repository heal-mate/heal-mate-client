import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const queryKeys = {
  matchesRecommend: "MATCHES_RECOMMEND",
  matchesSent: "MATCHES_SENT",
  matchesReceived: "MATCHES_RECEIVED",
  matchStatus: "MATCH_STATUS",
};
