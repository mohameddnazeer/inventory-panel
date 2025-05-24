
import APIClient from "../apiClient";
import { ExistedFormData } from "@/schemas/ExistedFormSchema";
import APIMaltiPartClient from "../apiMaltiPartClient";

  export interface Sq {
    name: string;
    number: string;
    createdByUserId: string;
    createdUser: User | null;
    createdDate: string;
    lastModifiedUserId: string;
    lastModifiedUser: User | null;
    lastModifiedDate: string;
    isDeleted: boolean;
    id: number;
  }
  
  export interface User {
    // Add user properties here if known
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
    createdUser: User | null;
    createdDate: string;
    lastModifiedUserId: string | null;
    lastModifiedUser: User | null;
    lastModifiedDate: string;
    isDeleted: boolean;
    id: number;
  }
  

export default new APIMaltiPartClient<FormData, ExistedItemResponse >("api/ExistingItems");

