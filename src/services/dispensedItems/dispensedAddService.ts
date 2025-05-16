import { DispensedFormData } from "@/schemas/DispensedFormSchema";
import APIClient from "../apiClient";

export interface DispensedItemResponse {
  dispensedQuantity: number;
  toWhom: string;
  receiverName: string;
  deliveredName: string;
  notes?: string;
  existingItemId: number;
  existingItem: ExistingItem;
  createdByUserId: string;
  createdUser: User | null;
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: User | null;
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
  quantityEnum: "UNIT" | "KG" | "LITER";
  sqId: number;
  sq: any | null; // Replace `any` with a proper type if you know the structure of `sq`
  createdByUserId: string;
  createdUser: User | null;
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: User | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

export interface User {
  // Define this if user fields are known, otherwise leave it as `null`
}

export default new APIClient<DispensedFormData, DispensedItemResponse>("api/DispensedItems");

// this null for the response from the postData method if the post has a response Data we should change it to the comming response Data type
