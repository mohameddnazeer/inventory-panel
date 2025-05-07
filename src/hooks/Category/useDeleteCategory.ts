import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryDeleteService from "@/services/sqCategories/CategoryDeleteService";

const useDeleteCategory = ()=>{
  
    const queryClient = useQueryClient()
    return useMutation<null , Error , number>({
        mutationFn: (id)=> CategoryDeleteService.delete(id),
        onSuccess: (data) => {
         console.log('successed adding category')
         console.log(data)
         queryClient.invalidateQueries({queryKey:['Category']})
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useDeleteCategory}