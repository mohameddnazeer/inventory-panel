import APIClient from "../apiClient";

export interface DispensedItem {
  dispensedQuantity: number;
  toWhom: string;
  receiverName: string;
  deliveredName: string;
  notes: string;
  existingItemId: number;
  existingItem: ExistingItem ;
  createdByUserId: string;
  createdUser: string | null; 
  createdDate: string; 
  lastModifiedUserId: string;
  lastModifiedUser: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}
export interface ExistingItem {
  name: string;
  imagePath: string;
  brand: string;
  serial: string;
  notes: string;
  quantity: number;
  quantityEnum: string;
  sqId: number;
  sq: string;
  createdByUserId: string;
  createdUser: string;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: string;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

// Avoid anonymous default export
const dispensedItemsClient = new APIClient<DispensedItem, null>("api/DispensedItems");

export default dispensedItemsClient;
