import APIClient from "../apiClient";

// You can name the variable based on the API endpoint's purpose
const borrowedItemsClient = new APIClient<null, null>("api/BorrowedItems");

export default borrowedItemsClient;
