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
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string | null;
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
  quantityEnum: "UNIT" | "KG" | "LITER";
  sqId: number;
  sq: string | null; // Replace `string` with a proper type if known
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

// ✅ Named instance before export to avoid ESLint warning
const dispensedItemsClient = new APIClient<DispensedFormData, DispensedItemResponse>("api/DispensedItems");

export default dispensedItemsClient;
