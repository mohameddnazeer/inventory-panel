
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import existedUploadExcel from "@/services/existedItems/existedUploadExcel";

const useUploadExcel = () => {
    const queryClient = useQueryClient()
  return useMutation<null, Error, FormData>({
    mutationFn: existedUploadExcel.uploadFile,
    onSuccess: () => {

     queryClient.invalidateQueries({queryKey :["ExistedItems"]})
      toast.success("تمت رفع ملف الإكسيل بنجاح");
    },
    onError: error => {
      console.error("Login failed:", error);
      toast.error(error.message);
    },
  });
};

export { useUploadExcel };
