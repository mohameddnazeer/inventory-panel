import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import borrowAddService, { BorrowedItemResponse } from "@/services/borrowedItems/borrowAddService";


const useAddBorrowedItems = ()=>{
     
    return useMutation<BorrowedItemResponse , Error , BorrowedFormData>({
        mutationFn: borrowAddService.postData,
        onSuccess: (data) => {
            
        },
        onError: (error) => {
          console.error("Borrowed Item failed:", error);
        }
      });
}


export  {useAddBorrowedItems}