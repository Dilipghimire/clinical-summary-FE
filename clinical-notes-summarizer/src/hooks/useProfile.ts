import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/profile");
      return res.data;
    },
    enabled: !!localStorage.getItem("access_token"),
  });
}
