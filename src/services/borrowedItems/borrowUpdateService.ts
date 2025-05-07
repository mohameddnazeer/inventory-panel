
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import APIClient from "../apiClient";


export interface BorrowedItemResponse {
    name: string;
    toWhom: string;
    isReturned: boolean;
    notes: string;
    createdByUserId: string;
    createdUser: any | null;
    createdDate: string;
    lastModifiedUserId: string;
    lastModifiedUser: any | null;
    lastModifiedDate: string;
    isDeleted: boolean;
    id: number;
  }
  
  

export default new APIClient< {id:number ,formData: FormData}, BorrowedItemResponse >("api/BorrowedItems");

// this null for the response from the postData method if the post has a response Data we should change it to the comming response Data type