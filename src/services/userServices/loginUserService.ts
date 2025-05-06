
import { LoginFormData } from "@/schemas/loginFormSchema";

import APIClient from "../apiClient";

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
  };
export default new APIClient<LoginFormData , TokenResponse >("api/Users/login");

