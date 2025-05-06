import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import { useRouter } from "next/navigation";
import { LoginFormData } from "@/schemas/loginFormSchema";
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import dispensedAddService, { DispensedItemResponse } from "@/services/dispensedItems/dispensedAddService";
import { DispensedFormData } from "@/schemas/DispensedFormSchema";



const useAddDispensedItem = ()=>{

    const queryClient = useQueryClient();
    return useMutation<DispensedItemResponse , Error , DispensedFormData>({
        mutationFn: dispensedAddService.postData,
        onSuccess: (data) => {
           console.log(data)
           queryClient.invalidateQueries({ queryKey: ['dispensedItems'] });
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useAddDispensedItem}