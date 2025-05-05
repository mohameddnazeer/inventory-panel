import { useMutation } from "@tanstack/react-query";


import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";

import borrowAddService, { BorrowedItemResponse } from "@/services/borrowedItems/borrowAddService";



const useAddBorrowedItems = ()=>{
    
    return useMutation<BorrowedItemResponse , Error , BorrowedFormData>({
        mutationFn: borrowAddService.postData,
        onSuccess: (data) => {
           console.log(data)
        },
        onError: (error) => {
          console.error("Login failed:", error);
        }
      });
}


export  {useAddBorrowedItems}