// import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import APIClient from "../apiClient";
import { DispensedFormData } from "@/schemas/DispensedFormSchema";

export default new APIClient<{ id: number; formData: DispensedFormData }, null>(
  "api/DispensedItems",
);

// this null for the response from the postData method if the post has a response Data we should change it to the comming response Data type
