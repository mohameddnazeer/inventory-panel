import APIClient from "../apiClient";

// You can uncomment and refine the response interface when needed
// export interface ExistedItemResponse {
//   ...
// }

const existingItemsClient = new APIClient<null, null>("api/ExistingItems");

export default existingItemsClient;
