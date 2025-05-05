import { useMutation } from "@tanstack/react-query";
import existedAddService, { ExistedItemResponse } from "@/services/existedItems/existedAddService";
import { ExistedFormData } from "@/schemas/ExistedFormSchema";



const useAddExistedItem = ()=>{
   
    return useMutation<ExistedItemResponse , Error , ExistedFormData>({
        mutationFn: existedAddService.postData,
        onSuccess: (data) => {
         console.log('successed adding category')
         console.log(data)
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useAddExistedItem}