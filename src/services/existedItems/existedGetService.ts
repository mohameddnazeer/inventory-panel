

import APIClient from "../apiClient";



export interface Sq {
  name: string;
  number: string;
  createdByUserId: string;
  createdUser: any; // You can replace 'any' with a proper type if available
  createdDate: string;
  lastModifiedUserId: string;
  lastModifiedUser: any; // Replace 'any' if needed
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
  createdUser: any; // Replace if needed
  createdDate: string;
  lastModifiedUserId: string | null;
  lastModifiedUser: any; // Replace if needed
  lastModifiedDate: string;
  isDeleted: boolean;
  id: number;
}


export default new APIClient<ExistedItem, null >("api/ExistingItems");

