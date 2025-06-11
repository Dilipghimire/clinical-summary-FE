import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

type SignupForm = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  password_hash: string;
};

export function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      first_name,
      middle_name,
      last_name,
      email,
      password_hash,
    }: SignupForm) => {
      const res = await api.post("/signup", {
        first_name,
        middle_name,
        last_name,
        email,
        password_hash,
      });

      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      navigate("/login");
    },
  });
}
