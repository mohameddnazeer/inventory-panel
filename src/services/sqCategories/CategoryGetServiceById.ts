import APIClient from "../apiClient";

export interface CategoryItemResponse {
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

// First generic: request body (null, since none is sent)
// Second generic: response type from API
const categoryService = new APIClient<null, CategoryItemResponse>("api/SQs");

export default categoryService;
