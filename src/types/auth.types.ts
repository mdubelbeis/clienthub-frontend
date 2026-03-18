export interface LoginRequest {
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
