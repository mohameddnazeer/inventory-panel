import existedDeleteService from "@/services/existedItems/existedDeleteService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteExisteditem = () => {
  return useMutation<null, Error, number>({
    mutationFn: id => existedDeleteService.delete(id),
    onSuccess: () => {

      toast.success("تم حذف العنصر بنجاح");
    },
    onError: error => {
      console.error("Login failed:", error);
      toast.error(error.message);
    },
  });
};

export { useDeleteExisteditem };
