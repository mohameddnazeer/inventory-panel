import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import APIClient from "../apiClient";

// If you truly intend to send both id and formData in the request body
export type BorrowedUpdateRequest = {
  id: number;
  formData: BorrowedFormData;
};

const borrowedItemUpdateClient = new APIClient<BorrowedUpdateRequest, null>("api/BorrowedItems");

export default borrowedItemUpdateClient;
