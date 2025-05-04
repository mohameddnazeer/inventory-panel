import { useMutation } from "@tanstack/react-query";

import loginUserService from "@/services/userServices/loginUserService";
import { useRouter } from "next/navigation";

const useLoginUser = ()=>{
    const router = useRouter()
    return useMutation({
        mutationFn: loginUserService.loginUser,
        onSuccess: () => {
          router.push('/dashboard')
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useLoginUser}