import borrowDeleteService from "@/services/borrowedItems/borrowDeleteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteBorrowedItem = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, number>({
    mutationFn: id => borrowDeleteService.delete(id),
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["BorrowedItems"] });
    },
    onError: error => {
      console.error("Borrowed Item failed:", error);
    },
  });
};

export { useDeleteBorrowedItem };
