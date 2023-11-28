import { useMutation, useQuery } from "react-query";
import { User } from "@/service/apis/user.type";
import { queryClient, queryKeys } from "@/service/store/reactQuery";
import {
  fetchAcceptMatch,
  fetchCancelMatch,
  fetchGetMatchesReceived,
  fetchGetMatchesSent,
  fetchRejectMatch,
  fetchRequestMatch,
} from "@/service/apis/match";
import { fetchGetUser, fetchGetUserRecommend } from "@/service/apis/user";
import { Match } from "@/service/apis/match.type";

type MatchCardProps = (User & Match & { userId: string; matchId: string })[];

export const useMatchesRecommend = () => {
  const { data: matchesRecommend, ...rest } = useQuery<User[], Error>({
    queryKey: [queryKeys.matchesRecommend],
    queryFn: fetchGetUserRecommend,
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesRecommend],
    });

  const requestMatch = useMutation({
    mutationFn: fetchRequestMatch,
    onSuccess: invalidateMatchQuery,
  }).mutate;

  return { matchesRecommend, requestMatch, ...rest };
};

export const useMatchesSent = () => {
  const { data: matchesSent, ...rest } = useQuery<MatchCardProps, Error>({
    queryKey: [queryKeys.matchesSent],
    queryFn: async () => {
      const matches = await fetchGetMatchesSent();

      const results = await Promise.all(
        matches.map(async (match) => {
          const user = await fetchGetUser({ userId: match.receiverId });
          return { ...user, userId: user._id, ...match, matchId: match._id };
        }),
      );

      return results;
    },
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesRecommend],
    });

  const cancelMatch = useMutation({
    mutationFn: fetchCancelMatch,
    onSuccess: invalidateMatchQuery,
  }).mutate;

  return { matchesSent, cancelMatch, ...rest };
};

export const useMatchesReceived = () => {
  const { data: matchesReceived, ...rest } = useQuery<MatchCardProps, Error>({
    queryKey: [queryKeys.matchesReceived],
    queryFn: async () => {
      const matches = await fetchGetMatchesReceived();

      const results = await Promise.all(
        matches.map(async (match) => {
          const user = await fetchGetUser({ userId: match.senderId });
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
    mutationFn: fetchAcceptMatch,
    onSuccess: invalidateMatchQuery,
  }).mutate;

  const rejectMatch = useMutation({
    mutationFn: fetchRejectMatch,
    onSuccess: invalidateMatchQuery,
  }).mutate;

  return { matchesReceived, acceptMatch, rejectMatch, ...rest };
};
