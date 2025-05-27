import APIClient from "../apiClient";

// Use a named constant before exporting to satisfy ESLint
const dispensedItemsClient = new APIClient<null, null>("api/DispensedItems");

export default dispensedItemsClient;
