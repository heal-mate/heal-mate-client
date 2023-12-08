import { useMutation, useQuery } from "react-query";
import { User } from "@/service/apis/user.type";
import { queryClient, queryKeys } from "@/service/store/reactQuery";
import matchAPI from "@/service/apis/match";
import userAPI from "@/service/apis/user";
import { Match } from "@/service/apis/match.type";

type MatchCardProps = (User & Match & { userId: string; matchId: string })[];

export const useMatchesRecommend = () => {
  const { data: matchesRecommend, ...rest } = useQuery<User[], Error>({
    queryKey: [queryKeys.matchesRecommend],
    queryFn: userAPI.getUsersRecommend,
  });

  const invalidateMatchQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesRecommend],
    });
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesSent],
    });
  };
  const requestMatch = useMutation({
    mutationFn: matchAPI.requestMatch,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { matchesRecommend, requestMatch, ...rest };
};

export const useMatchesSent = () => {
  const { data: matchesSent, ...rest } = useQuery<MatchCardProps, Error>({
    queryKey: [queryKeys.matchesSent],
    queryFn: async () => {
      const matches = await matchAPI.getMatchesSent();

      const results = await Promise.all(
        matches.map(async (match) => {
          const user = await userAPI.getUser({ userId: match.receiverId });
          return { ...user, userId: user._id, ...match, matchId: match._id };
        }),
      );

      return results;
    },
  });

  const invalidateMatchQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesRecommend],
    });
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesSent],
    });
  };

  const cancelMatch = useMutation({
    mutationFn: matchAPI.cancelMatch,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { matchesSent, cancelMatch, ...rest };
};

export const useMatchesReceived = () => {
  const { data: matchesReceived, ...rest } = useQuery<MatchCardProps, Error>({
    queryKey: [queryKeys.matchesReceived],
    queryFn: async () => {
      const matches = await matchAPI.getMatchesReceived();

      const results = await Promise.all(
        matches.map(async (match) => {
          const user = await userAPI.getUser({ userId: match.senderId });
          return { ...user, userId: user._id, ...match, matchId: match._id };
        }),
      );

      return results;
    },
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesReceived],
    });

  const acceptMatch = useMutation({
    mutationFn: matchAPI.acceptMatch,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  const rejectMatch = useMutation({
    mutationFn: matchAPI.rejectMatch,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { matchesReceived, acceptMatch, rejectMatch, ...rest };
};
