import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useGetSummary(patient_namespace: string) {
  return useQuery({
    queryKey: [patient_namespace],
    queryFn: async () => {
      const res = await api.get(
        `/summary?patient_namespace=${patient_namespace}`
      );
      return res.data?.summary;
    },
    enabled: false,
  });
}
