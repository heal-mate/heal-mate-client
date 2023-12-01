import { useMutation, useQuery } from "react-query";
import { Alert } from "@/service/apis/alert.type";
import { queryClient, queryKeys } from "@/service/store/reactQuery";
import {
  fetchGetAlerts,
  fetchReadAlert,
  fetchRemoveAlert,
} from "@/service/apis/alert";

export const useGetAlertsAll = () => {
  const { data: alertsList, ...rest } = useQuery<Alert[], Error>({
    queryKey: [queryKeys.alerts],
    queryFn: fetchGetAlerts,
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.alerts],
    });

  const readAlert = useMutation({
    mutationFn: fetchReadAlert,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  const removeAlert = useMutation({
    mutationFn: fetchRemoveAlert,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { alertsList, readAlert, removeAlert, ...rest };
};
