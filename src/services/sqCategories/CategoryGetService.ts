import APIClient from "../apiClient";

export interface CategoryItem {
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

// First type (CategoryItem) = request body
// Second type (null) = response type
const categoryService = new APIClient<CategoryItem, null>("api/SQs");

export default categoryService;
