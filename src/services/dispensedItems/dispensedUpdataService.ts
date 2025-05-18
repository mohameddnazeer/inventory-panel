// import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import APIClient from "../apiClient";
import { DispensedFormData } from "@/schemas/DispensedFormSchema";

export default new APIClient<{ id: number; formData: DispensedFormData }, null>(
  "api/DispensedItems",
);
