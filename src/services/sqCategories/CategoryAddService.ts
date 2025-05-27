import APIMaltiPartClient from "../apiMaltiPartClient";

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

const sqsClient = new APIMaltiPartClient<FormData, CategoryItemResponse>("api/SQs");

export default sqsClient;
