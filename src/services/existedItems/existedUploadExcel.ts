import APIMaltiPartClient from "../apiMaltiPartClient";

const importExistingItemsClient = new APIMaltiPartClient<FormData, null>("api/ExistingItems/import");

export default importExistingItemsClient;
