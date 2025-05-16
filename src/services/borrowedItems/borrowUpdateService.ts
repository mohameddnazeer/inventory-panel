
// import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import { BorrowedFormData } from "@/schemas/BorrowedFormSchema";
import APIClient from "../apiClient";




export default new APIClient< {id:number ,formData: BorrowedFormData}, null >("api/BorrowedItems");
