import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { DispensedFormData } from "@/schemas/DispensedFormSchema";
import dispensedAddService, {
  DispensedItemResponse,
} from "@/services/dispensedItems/dispensedAddService";

const useAddDispensedItem = () => {
  const queryClient = useQueryClient();
  return useMutation<DispensedItemResponse, Error, DispensedFormData>({
    mutationFn: dispensedAddService.postData,
    onSuccess: data => {

      queryClient.invalidateQueries({ queryKey: ["dispensedItems"] });
      toast.success("تمت إضافة العنصر بنجاح");
    },
    onError: error => {
      console.error("Login failed:", error);
      toast.error(error.message);
    },
  });
};

export { useAddDispensedItem };
