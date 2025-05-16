import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DispensedFormData } from "@/schemas/DispensedFormSchema";
import dispensedAddService, {
  DispensedItemResponse,
} from "@/services/dispensedItems/dispensedAddService";

const useAddDispensedItem = () => {
  const queryClient = useQueryClient();
  return useMutation<DispensedItemResponse, Error, DispensedFormData>({
    mutationFn: dispensedAddService.postData,
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["dispensedItems"] });
    },
    onError: error => {
      console.error("Login failed:", error);
    },
  });
};

export { useAddDispensedItem };
