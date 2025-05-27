import APIClient from "../apiClient";
import { DispensedFormData } from "@/schemas/DispensedFormSchema";

// Avoid anonymous default export
const dispensedItemsClient = new APIClient<{ id: number; formData: DispensedFormData }, null>(
  "api/DispensedItems"
);

export default dispensedItemsClient;
