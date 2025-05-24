
import CategoryAddService, { CategoryItemResponse } from "@/services/sqCategories/CategoryAddService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<CategoryItemResponse, Error, FormData>({
    mutationFn: CategoryAddService.postData,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey :["Category"]})
      toast.success("تمت إضافة العنصر المستعار بنجاح");
    },
    onError: error => {
      toast.error(error.message);
    },
  });
};

export { useAddCategory };
