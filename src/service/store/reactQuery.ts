import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,

      retry: 1,
    },
    mutations: {
      useErrorBoundary: true,

      retry: 1,
    },
  },
});

export const queryKeys = {
  matchesRecommend: "MATCHES_RECOMMEND",
  matchesSent: "MATCHES_SENT",
  matchesReceived: "MATCHES_RECEIVED",
  matchStatus: "MATCH_STATUS",
  alerts: "ALERTS",
};
