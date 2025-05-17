import borrowDeleteService from "@/services/borrowedItems/borrowDeleteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteBorrowedItem = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, number>({
    mutationFn: id => borrowDeleteService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BorrowedItems"] });
      toast.success("تم حذف العنصر المستعار بنجاح");
    },
    onError: error => {
      console.error("Borrowed Item failed:", error);
      toast.error("فشل حذف العنصر المستعار");
    },
  });
};

export { useDeleteBorrowedItem };
