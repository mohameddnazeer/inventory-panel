import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import borrowUpdateService from "@/services/borrowedItems/borrowUpdateService";

const useUpdateBorrowedItems = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, { id: number; formData: BorrowedFormData }>({
    mutationFn: borrowUpdateService.updateBorrowedItems,
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["BorrowedItems"] });
    },
    onError: error => {
      console.error("Borrowed Item failed:", error);
    },
  });
};

export { useUpdateBorrowedItems };
