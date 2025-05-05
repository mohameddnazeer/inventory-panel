
import APIClient from "../apiClient";



 export interface DispensedItem {
  dispensedQuantity: number;
  toWhom: string;
  receiverName: string;
  deliveredName: string;
  notes: string;
  existingItemId: number;
  existingItem: any | null; // Replace `any` with a specific type if known
  createdByUserId: string;
  createdUser: any | null; // Replace `any` if you have a user structure
  createdDate: string; // Or use `Date` if you convert it
  lastModifiedUserId: string;
  lastModifiedUser: any | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}



export default new APIClient<DispensedItem, null >("api/DispensedItems");

