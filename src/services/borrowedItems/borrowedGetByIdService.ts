// /api/ExistingItems/{existingItemId}



import APIClient from "../apiClient";

export interface ItemDetailsResponse {
  id: number;
  name: string;
  toWhom: string;
  isReturned: boolean;
  notes?: string;
  createdByUserId: string;
  createdUser: any | null;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: any | null;
  lastModifiedDate: string;
  isDeleted: boolean;
}

export default new APIClient<null, ItemDetailsResponse >("api/BorrowedItems");

