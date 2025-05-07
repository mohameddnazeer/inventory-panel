import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dispensedDeleteService from "@/services/dispensedItems/dispensedDeleteService";



const useDeleteDispensedItem = ()=>{

    const queryClient = useQueryClient();
    return useMutation<null , Error , number>({
        mutationFn: (id)=>dispensedDeleteService.delete(id),
        onSuccess: (data) => {
           console.log(data)
           queryClient.invalidateQueries({ queryKey: ['dispensedItems'] });
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useDeleteDispensedItem}