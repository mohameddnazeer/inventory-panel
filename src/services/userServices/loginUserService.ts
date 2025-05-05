
import { LoginFormData } from "@/schemas/loginFormSchema";

import APIClient from "../apiClient";

type Token = {
    accessToken: string;
    refreshToken: string;
  };
export default new APIClient<LoginFormData , Token >("api/Users/login");

