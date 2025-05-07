import { useMutation, useQueryClient } from "@tanstack/react-query";
import existedDeleteService from "@/services/existedItems/existedDeleteService";

const useDeleteExisteditem = ()=>{
  
    return useMutation<null , Error , number>({
        mutationFn: (id)=>existedDeleteService.delete(id),
        onSuccess: (data) => {
         console.log('successed Deleting ExistedItem')
         
        
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useDeleteExisteditem}