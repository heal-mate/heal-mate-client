import { useMutation, useQuery } from "react-query";
import { Alert } from "@/service/apis/alert.type";
import { queryClient, queryKeys } from "@/service/store/reactQuery";
import alertAPI from "@/service/apis/alert";

export const useGetAlertsAll = () => {
  const { data: alertsList, ...rest } = useQuery<Alert[], Error>({
    queryKey: [queryKeys.alerts],
    queryFn: alertAPI.getAlerts,
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.alerts],
    });

  const readAlert = useMutation({
    mutationFn: alertAPI.readAlert,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  const removeAlert = useMutation({
    mutationFn: alertAPI.removeAlert,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { alertsList, readAlert, removeAlert, ...rest };
};
