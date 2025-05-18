import CategoryDeleteService from "@/services/sqCategories/CategoryDeleteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, number>({
    mutationFn: id => CategoryDeleteService.delete(id),
    onSuccess: data => {
      console.log("successed adding category");
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["Category"] });
      toast.success("تم حذف الفئة بنجاح");
    },
    onError: error => {
      console.error("Login failed:", error);
      toast.error(error.message);
    },
  });
};

export { useDeleteCategory };
