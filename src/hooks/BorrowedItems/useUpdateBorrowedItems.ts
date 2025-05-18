import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import borrowUpdateService from "@/services/borrowedItems/borrowUpdateService";

const useUpdateBorrowedItems = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, { id: number; formData: BorrowedFormData }>({
    mutationFn: borrowUpdateService.updateBorrowedItems,
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["BorrowedItems"] });
      toast.success("تم تحديث العنصر المستعار بنجاح");
    },
    onError: error => {
      console.error("Borrowed Item failed:", error);
      toast.error(error.message);
    },
  });
};

export { useUpdateBorrowedItems };
