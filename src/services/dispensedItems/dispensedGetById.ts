import APIClient from "../apiClient";

export interface DispensedResponse {
  dispensedQuantity: number;
  toWhom: string;
  receiverName: string;
  deliveredName: string;
  notes: string;
  existingItemId: number;
  existingItem: string;
  createdByUserId: string;
  createdUser: string;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: string;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

// Assign to a variable before export to avoid ESLint warning
const dispensedItemsClient = new APIClient<null, DispensedResponse>("api/DispensedItems");

export default dispensedItemsClient;
