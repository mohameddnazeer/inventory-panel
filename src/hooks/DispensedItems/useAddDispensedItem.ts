import { useMutation } from "@tanstack/react-query";


import { useRouter } from "next/navigation";
import { LoginFormData } from "@/schemas/loginFormSchema";
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import dispensedAddService, { DispensedItemResponse } from "@/services/dispensedItems/dispensedAddService";
import { DispensedFormData } from "@/schemas/DispensedFormSchema";



const useAddDispensedItem = ()=>{
    const router = useRouter()
    return useMutation<DispensedItemResponse , Error , DispensedFormData>({
        mutationFn: dispensedAddService.postData,
        onSuccess: (data) => {
           console.log(data)
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useAddDispensedItem}