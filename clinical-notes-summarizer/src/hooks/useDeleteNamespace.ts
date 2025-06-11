import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

type DeleteNamespace = {
  patient_namespace: string;
};

export function useDelete() {
  return useMutation({
    mutationFn: async ({ patient_namespace }: DeleteNamespace) => {
      const res = await api.post(
        `/delete-pc-namespace?patient_namespace=${patient_namespace}`
      );
      return res.data;
    },
  });
}
