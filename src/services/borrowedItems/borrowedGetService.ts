import APIClient from "../apiClient";

export interface BorrowedItem {
  name: string;
  toWhom: string;
  isReturned: boolean;
  notes: string;
  createdByUserId: string;
  createdUser: string;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: string;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

// ✅ Assign instance before default export
const borrowedItemClient = new APIClient<BorrowedItem, null>("api/BorrowedItems");

export default borrowedItemClient;
