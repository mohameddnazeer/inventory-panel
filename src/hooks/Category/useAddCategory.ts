import { useMutation } from "@tanstack/react-query";


import sqAddService, { CategoryItemResponse } from "@/services/sqCategories/CategoryAddService";
import { CategoryFormData } from "@/schemas/CategoryFormSchema";



const useAddCategory = ()=>{
   
    return useMutation<CategoryItemResponse , Error , CategoryFormData>({
        mutationFn: sqAddService.postData,
        onSuccess: (data) => {
         console.log('successed adding category')
         console.log(data)
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}
// 

export  {useAddCategory}