
import APIClient from "../apiClient";
import { ExistedFormData } from "@/schemas/ExistedFormSchema";


export interface ExistedItemResponse {
    name: string;
    imagePath: string;
    brand: string;
    serial: string;
    notes: string;
    quantity: number;
    quantityEnum: 'UNIT' | 'METER'; // Add more if needed
    sqId: number;
    sq: {
      name: string;
      number: string;
      createdByUserId: string;
      createdUser: any; // Use a specific type if available
      createdDate: string;
      lastModifiedUserId: string;
      lastModifiedUser: any; // Use a specific type if available
      lastModifiedDate: string;
      isDeleted: boolean;
      id: number;
    } | null;
    createdByUserId: string;
    createdUser: any; // Use a specific type if available
    createdDate: string;
    lastModifiedUserId: string | null;
    lastModifiedUser: any; // Use a specific type if available
    lastModifiedDate: string;
    isDeleted: boolean;
    id: number;
  }
  
  

export default new APIClient<ExistedFormData, ExistedItemResponse >("api/ExistingItems");

