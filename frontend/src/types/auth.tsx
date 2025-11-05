export interface User {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginMutationResponse {
  login: AuthResponse;
}

export interface RegisterMutationResponse {
  register: AuthResponse;
}

export interface MeQueryResponse {
  me: User;
}
