import APIClient from "../apiClient";

export interface Sq {
  name: string;
  number: string;
  createdByUserId: string;
  createdUser: string;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: string;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

export interface ExistedItem {
  name: string;
  imagePath: string;
  brand: string;
  serial: string;
  notes: string;
  quantity: number;
  quantityEnum: string;
  sqId: number;
  sq: Sq;
  createdByUserId: string;
  createdUser: string;
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: string;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

// Fix for ESLint: assign to variable before default export
const existedItemClient = new APIClient<ExistedItem, null>("api/ExistingItems");

export default existedItemClient;
