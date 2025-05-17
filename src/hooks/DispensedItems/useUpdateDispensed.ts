import dispensedUpdataService from "@/services/dispensedItems/dispensedUpdataService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DispensedFormData } from "../../schemas/DispensedFormSchema";

const useUpdateDispensed = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, { id: number; formData: DispensedFormData }>({
    mutationFn: dispensedUpdataService.updateDispensedItems,
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["dispensedItems"] });
      toast.success("تم تحديث العنصر بنجاح");
    },
    onError: error => {
      console.error("Borrowed Item failed:", error);
      toast.error("فشل تحديث العنصر");
    },
  });
};

export { useUpdateDispensed };
