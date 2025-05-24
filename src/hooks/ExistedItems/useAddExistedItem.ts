import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import existedAddService, { ExistedItemResponse } from "@/services/existedItems/existedAddService";

const useAddExistedItem = () => {
  

    const queryClient = useQueryClient()
    return useMutation<ExistedItemResponse, Error, FormData>({
    mutationFn:existedAddService.postData,
    onSuccess: data => {
      console.log("successed adding category")
      console.log(data)
      queryClient.invalidateQueries({queryKey :["ExistedItems"]})
      toast.success("تمت إضافة العنصر بنجاح")
    },
    onError: error => {
      console.error("Login failed:", error)
      toast.error(error.message)
    },
  });
};

export { useAddExistedItem };
