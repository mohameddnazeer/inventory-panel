import { LoginFormData } from "@/schemas/loginFormSchema";
import APIClient from "../apiClient";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Fix ESLint warning by assigning to a named variable
const loginService = new APIClient<LoginFormData, TokenResponse>("api/Users/login");

export default loginService;
