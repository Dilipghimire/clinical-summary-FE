import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

type UploadFiles = {
  files: File[];
};

type ResponseData = {
  namespace: string;
  message: string;
};

export function useUpload() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ files }: UploadFiles) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data: ResponseData) => {
      navigate("/summarize-report", {
        state: { responseData: data?.namespace },
      });
    },
  });
}
