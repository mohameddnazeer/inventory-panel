import dispensedDeleteService from "@/services/dispensedItems/dispensedDeleteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteDispensedItem = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, number>({
    mutationFn: id => dispensedDeleteService.delete(id),
    onSuccess: data => {

      queryClient.invalidateQueries({ queryKey: ["dispensedItems"] });
      toast.success("تم حذف العنصر بنجاح");
    },
    onError: error => {
      console.error("Login failed:", error);
      toast.error(error.message);
    },
  });
};

export { useDeleteDispensedItem };
