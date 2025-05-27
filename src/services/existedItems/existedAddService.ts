import APIMaltiPartClient from "../apiMaltiPartClient";

export interface Sq {
  name: string;
  number: string;
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

export interface ExistedItemResponse {
  name: string;
  imagePath: string;
  brand: string;
  serial: string;
  notes: string;
  quantity: number;
  quantityEnum: 'UNIT' | 'KG' | 'LITER';
  sqId: number;
  sq: Sq;
  createdByUserId: string;
  createdUser: string | null;
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: string | null;
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}

// Named instance
const existedItemsClient = new APIMaltiPartClient<FormData, ExistedItemResponse>("api/ExistingItems");

export default existedItemsClient;
