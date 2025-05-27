import APIClient from "../apiClient";

const sqsService = new APIClient<null, null>("api/SQs");

export default sqsService;
