import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import borrowAddService, { BorrowedItemResponse } from "@/services/borrowedItems/borrowAddService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddBorrowedItems = () => {
  const queryClient = useQueryClient();
  return useMutation<BorrowedItemResponse, Error, BorrowedFormData>({
    mutationFn: borrowAddService.postData,
    onSuccess: data => {
      queryClient.invalidateQueries();
      toast.success("تمت إضافة العنصر المستعار بنجاح");
    },
    onError: error => {
      console.error("Borrowed Item failed:", error);
      toast.error("فشل إضافة العنصر المستعار");
    },
  });
};

export { useAddBorrowedItems };
