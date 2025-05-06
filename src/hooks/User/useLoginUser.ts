import { useMutation } from "@tanstack/react-query";

import loginUserService from "@/services/userServices/loginUserService";
import { useRouter } from "next/navigation";
import { LoginFormData } from "@/schemas/loginFormSchema";


type Token = {
  accessToken: string;
  refreshToken: string;
  
};

const useLoginUser = ()=>{
    const router = useRouter()
    return useMutation<Token , Error , LoginFormData>({
        mutationFn: loginUserService.postData,
        onSuccess: (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          router.push('/dashboard')
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useLoginUser}