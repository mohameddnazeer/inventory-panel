import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import borrowAddService, { BorrowedItemResponse } from "@/services/borrowedItems/borrowAddService";
import borrowUpdateService from "@/services/borrowedItems/borrowUpdateService";


const useUpdateBorrowedItems = ()=>{
      const queryClient = useQueryClient()
    return useMutation<BorrowedItemResponse , Error , {id:number ,formData: FormData}>({
        mutationFn: borrowUpdateService.update,
        onSuccess: (data) => {
           console.log(data)
           queryClient.invalidateQueries({queryKey:['BorrowedItmes']})
        },
        onError: (error) => {
          console.error("Borrowed Item failed:", error);
        }
      });
}


export  {useUpdateBorrowedItems}