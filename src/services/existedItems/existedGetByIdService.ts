// /api/ExistingItems/{existingItemId}



import APIClient from "../apiClient";


// this interface for the response Data that will come from the back 
export interface InventoryItemResponse {
    name: string;
    imagePath: string;
    brand: string;
    serial: string;
    notes: string;
    quantity: number;
    quantityEnum: 'UNIT' | 'METER'; // adjust if more enums exist
    sqId: number ;
    sq: string | null; // you can replace `string` with a proper type if available
    createdByUserId: string;
    createdUser: string | null;
    createdDate: string; // use `Date` if you're parsing this
    lastModifiedUserId: string | null;
    lastModifiedUser: string | null;
    lastModifiedDate: string | null;
    isDeleted: boolean;
    id: number;
  }

export default new APIClient<null, InventoryItemResponse >("api/ExistingItems");

