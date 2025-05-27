'use client';

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { LoginFormData } from "@/schemas/loginFormSchema";
import loginUserService from "@/services/userServices/loginUserService";

type Token = {
  accessToken: string;
  refreshToken: string;
};

const useLoginUser = () => {
  const router = useRouter();

  return useMutation<Token, Error, LoginFormData>({
    mutationFn: loginUserService.postData,
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem("accessToken", data.accessToken);
      }
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });
};

export { useLoginUser };
