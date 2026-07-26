import { api } from "@/lib/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const signup = async (data: SignupRequest) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};