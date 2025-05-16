import dispensedUpdataService from "@/services/dispensedItems/dispensedUpdataService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DispensedFormData } from "../../schemas/DispensedFormSchema";

const useUpdateDispensed = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, { id: number; formData: DispensedFormData }>({
    mutationFn: dispensedUpdataService.updateDispensedItems,
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["dispensedItems"] });
    },
    onError: error => {
      console.error("Borrowed Item failed:", error);
    },
  });
};

export { useUpdateDispensed };
