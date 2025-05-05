import { useMutation } from "@tanstack/react-query";


import sqAddService, { CategoryItem } from "@/services/sqCategories/sqAddService";
import { CategoryFormData } from "@/app/dashboard/categories/page";


const useAddCategory = ()=>{
   
    return useMutation<CategoryItem , Error , CategoryFormData>({
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


export  {useAddCategory}