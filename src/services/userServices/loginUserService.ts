
import { LoginFormData } from "@/schemas/loginFormSchema";

import APIClient from "../apiClient";

export default new APIClient<LoginFormData>("api/Users/login");

