import { DispencedSchema } from "@/schemas/DispensedFormSchema";
// /api/ExistingItems/{existingItemId}

import APIClient from "../apiClient";

export interface DispencedResponse {
  dispensedQuantity: number;
  toWhom: string;
  receiverName: string;
  deliveredName: string;
  notes: string;
  existingItemId: number;
  existingItem: any;
  createdByUserId: string;
  createdUser: any;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: any;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

export default new APIClient<null, DispencedResponse>("api/DispensedItems");
