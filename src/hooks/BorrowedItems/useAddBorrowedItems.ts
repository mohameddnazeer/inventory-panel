import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import borrowAddService, { BorrowedItemResponse } from "@/services/borrowedItems/borrowAddService";


const useAddBorrowedItems = ()=>{
      const queryClient = useQueryClient()
    return useMutation<BorrowedItemResponse , Error , BorrowedFormData>({
        mutationFn: borrowAddService.postData,
        onSuccess: (data) => {
           console.log(data)
           queryClient.invalidateQueries({queryKey:['borrowedItmes']})
        },
        onError: (error) => {
          console.error("Borrowed Item failed:", error);
        }
      });
}


export  {useAddBorrowedItems}