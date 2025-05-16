import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import borrowAddService, { BorrowedItemResponse } from "@/services/borrowedItems/borrowAddService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddBorrowedItems = () => {
  const queryClient = useQueryClient();
  return useMutation<BorrowedItemResponse, Error, BorrowedFormData>({
    mutationFn: borrowAddService.postData,
    onSuccess: data => {
      queryClient.invalidateQueries();
    },
    onError: error => {
      console.error("Borrowed Item failed:", error);
    },
  });
};

export { useAddBorrowedItems };
