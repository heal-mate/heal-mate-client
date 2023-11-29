import { useMutation, useQuery } from "react-query";
import { Condition, User } from "@/service/apis/match.type";
import { queryClient, queryKeys } from "@/service/store/reactQuery";
import { MOCK_USERS } from "dev@/UserData";

export const useMatchesRecommend = (conditionExpect: Condition<"RANGE">) => {
  const { data: matchesRecommend, ...rest } = useQuery<User[], Error>({
    queryKey: [queryKeys.matchesRecommend],
    queryFn: async () => {
      // TODO: 추천 유저 GET api 연결
      // return getUsersMatchRecommend(conditionExpect);
      console.log(conditionExpect);
      return Promise.resolve(MOCK_USERS);
    },
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesRecommend],
    });

  const requestMatch = useMutation({
    mutationFn: async (userId: string) => {
      // TODO: 매칭 요청(생성) api 호출
      console.log(`request match, ${userId}`);
    },
    onSuccess: invalidateMatchQuery,
  }).mutate;

  return { matchesRecommend, requestMatch, ...rest };
};

export const useMatchesSent = () => {
  const { data: matchesSent, ...rest } = useQuery<User[], Error>({
    queryKey: [queryKeys.matchesSent],
    queryFn: async () => {
      // TODO: 내가 보낸 요청 GET api 연결
      return Promise.resolve(MOCK_USERS);
    },
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesRecommend],
    });

  const cancelMatch = useMutation({
    mutationFn: async (userId: string) => {
      // TODO: 매칭 취소 api 호출
      console.log(`cancel match ${userId}`);
    },
    onSuccess: invalidateMatchQuery,
  }).mutate;

  return { matchesSent, cancelMatch, ...rest };
};

export const useMatchesReceived = () => {
  const { data: matchesReceived, ...rest } = useQuery<User[], Error>({
    queryKey: [queryKeys.matchesReceived],
    queryFn: async () => {
      // TODO: 내가 받은 요청 GET api 연결
      return Promise.resolve(MOCK_USERS);
    },
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.matchesReceived],
    });

  const acceptMatch = useMutation({
    mutationFn: async (userId: string) => {
      // TODO: 매칭 수락 api 호출
      console.log(`accept match ${userId}`);
    },
    onSuccess: invalidateMatchQuery,
  }).mutate;

  const rejectMatch = useMutation({
    mutationFn: async (userId: string) => {
      // TODO: 매칭 거절 api 호출
      console.log(`reject match ${userId}`);
    },
    onSuccess: invalidateMatchQuery,
  }).mutate;

  return { matchesReceived, acceptMatch, rejectMatch, ...rest };
};
