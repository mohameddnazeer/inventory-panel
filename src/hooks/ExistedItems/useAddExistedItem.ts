import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import existedAddService, { ExistedItemResponse } from "@/services/existedItems/existedAddService";
import { ExistedFormData } from "@/schemas/ExistedFormSchema";

const useAddExistedItem = () => {
  return useMutation<ExistedItemResponse, Error, ExistedFormData>({
    mutationFn: existedAddService.postData,
    onSuccess: data => {
      console.log("successed adding category");
      console.log(data);
      toast.success("تمت إضافة العنصر بنجاح");
    },
    onError: error => {
      console.error("Login failed:", error);
      toast.error(error.message);
    },
  });
};

export { useAddExistedItem };
