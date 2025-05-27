import APIClient from "../apiClient";

// This interface represents the response data for a single existing item
export interface InventoryItemResponse {
  name: string;
  imagePath: string;
  brand: string;
  serial: string;
  notes: string;
  quantity: number;
  quantityEnum: 'UNIT' | 'METER'; // extend if there are more options
  sqId: number;
  sq: string | null; // replace `string` with a more specific type if known
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: string | null;
  lastModifiedDate: string | null;
  isDeleted: boolean;
  id: number;
}

// Assign the API client to a variable before exporting
const existingItemClient = new APIClient<null, InventoryItemResponse>("api/ExistingItems");

export default existingItemClient;
