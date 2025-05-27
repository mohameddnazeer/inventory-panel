import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import APIClient from "../apiClient";

export interface BorrowedItemResponse {
  name: string;
  toWhom: string;
  isReturned: boolean;
  notes: string;
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

// ✅ Named instance for better debugging and to satisfy ESLint
const borrowedItemsClient = new APIClient<BorrowedFormData, BorrowedItemResponse>("api/BorrowedItems");

export default borrowedItemsClient;
