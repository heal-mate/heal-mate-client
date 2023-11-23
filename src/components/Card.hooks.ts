import { useMutation, useQuery } from "react-query";
import { queryClient, queryKeys } from "../store/query";
import { MatchStatus } from "./Card.type";

export const useMatching = (id: string) => {
  const { data: matchStatus, ...rest } = useQuery<MatchStatus | null, Error>({
    queryKey: [queryKeys.card, id],
    queryFn: () => {
      // TODO: GET /api/match?id={id}
      // TODO: api 연결 완료 시 아래 임시 리턴문 삭제
      return null;
    },
  });

  const invalidateMatchQuery = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.card, id] });
  };

  const requestMatch = useMutation({
    mutationFn: async () => {
      // TODO: 매칭 요청(생성) api 호출
      console.log("request match");
    },
    onSuccess: invalidateMatchQuery,
  }).mutate;

  const cancelMatch = useMutation({
    mutationFn: async () => {
      // TODO: 매칭 취소 api 호출
      console.log("cancel match");
    },
    onSuccess: invalidateMatchQuery,
  }).mutate;

  const acceptMatch = useMutation({
    mutationFn: async () => {
      // TODO: 매칭 수락 api 호출
      console.log("accept match");
    },
    onSuccess: invalidateMatchQuery,
  }).mutate;

  const rejectMatch = useMutation({
    mutationFn: async () => {
      // TODO: 매칭 거절 api 호출
      console.log("reject match");
    },
    onSuccess: invalidateMatchQuery,
  }).mutate;

  return {
    matchStatus,
    requestMatch,
    cancelMatch,
    acceptMatch,
    rejectMatch,
    ...rest,
  };
};
