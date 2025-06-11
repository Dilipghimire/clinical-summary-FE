import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password }: LoginForm) => {
      const form = new FormData();
      form.append("username", email); // FastAPI OAuth2 expects `username`
      form.append("password", password);
      const res = await api.post("/login", form);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      navigate("/summarize-report"); //only for now, change later
    },
  });
}
