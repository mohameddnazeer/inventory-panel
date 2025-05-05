
import APIClient from "../apiClient";

export interface BorrowedItem {
  name: string;
  toWhom: string;
  isReturned: boolean;
  notes: string | null;
  createdByUserId: string;
  createdUser: any | null; // Adjust `any` to a specific type if you know the structure
  createdDate: string; // You can use Date instead if you parse it
  lastModifiedUserId: string;
  lastModifiedUser: any | null; // Adjust if needed
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

export default new APIClient<BorrowedItem, null >("api/BorrowedItems");

