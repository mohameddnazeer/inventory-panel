import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import borrowAddService, { BorrowedItemResponse } from "@/services/borrowedItems/borrowAddService";
import borrowDeleteService from "@/services/borrowedItems/borrowDeleteService";


const useDeleteBorrowedItem = ()=>{
      const queryClient = useQueryClient()
    return useMutation<null , Error , number>({
        mutationFn: (id)=>borrowDeleteService.delete(id),
        onSuccess: (data) => {
           console.log(data)
           queryClient.invalidateQueries({queryKey:['BorrowedItmes']})
        },
        onError: (error) => {
          console.error("Borrowed Item failed:", error);
        }
      });
}


export  {useDeleteBorrowedItem}