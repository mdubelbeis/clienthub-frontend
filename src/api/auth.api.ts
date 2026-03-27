import api from './axios';
import type {
  RegistrationRequest,
  RegistrationResponse,
  LoginRequest,
  LoginResponse,
} from '../types/auth.types';

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('api/auth/login', data);
  return response.data;
};

export const registerUser = async (
  data: RegistrationRequest,
): Promise<RegistrationResponse> => {
  const response = await api.post('api/auth/register', data);
  return response.data;
};