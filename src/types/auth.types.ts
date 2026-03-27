export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegistrationResponse {
  message: string;
}

export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}


