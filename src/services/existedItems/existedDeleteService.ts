import APIClient from "../apiClient";

// Named instance to avoid anonymous default export warning
const existingItemsClient = new APIClient<null, null>("api/ExistingItems");

export default existingItemsClient;
