import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginFormData } from "@/schemas/loginFormSchema";
import loginUserService from "@/services/userServices/loginUserService";
import { useRouter } from "next/navigation";

type Token = {
  accessToken: string;
  refreshToken: string;
};

const useLoginUser = () => {
  const router = useRouter();
  return useMutation<Token, Error, LoginFormData>({
    mutationFn: loginUserService.postData,
    onSuccess: data => {
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/dashboard");
      toast.success("تم تسجيل الدخول بنجاح");
    },
    onError: error => {
      console.error("Login failed:", error);
      toast.error("فشل تسجيل الدخول");
    },
  });
};

export { useLoginUser };
