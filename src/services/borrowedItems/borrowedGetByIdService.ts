// /api/ExistingItems/{existingItemId}

import APIClient from "../apiClient";

export interface ItemDetailsResponse {
  id: number;
  name: string;
  toWhom: string;
  isReturned: boolean;
  notes?: string;
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
}

// ✅ Name the instance before export
const borrowedItemDetailsClient = new APIClient<null, ItemDetailsResponse>("api/BorrowedItems");

export default borrowedItemDetailsClient;
