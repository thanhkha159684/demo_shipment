import { ApolloClient } from '@apollo/client';
import { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY } from '../graphql/user';
import {
  LoginInput,
  RegisterInput,
  LoginMutationResponse,
  RegisterMutationResponse,
  MeQueryResponse,
  User,
} from '../types/user';

export class UserService {
  private static TOKEN_KEY = 'accessToken';

  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }

  static async login(
    client: ApolloClient,
    loginInput: LoginInput
  ): Promise<{ accessToken: string; user: User }> {
    const { data } = await client.mutate<LoginMutationResponse>({
      mutation: LOGIN_MUTATION,
      variables: { loginInput },
    });

    if (!data?.login) {
      throw new Error('Login failed');
    }

    this.setToken(data.login.accessToken);
    return data.login;
  }

  static async register(
    client: ApolloClient,
    registerInput: RegisterInput
  ): Promise<{ accessToken: string; user: User }> {
    const { data } = await client.mutate<RegisterMutationResponse>({
      mutation: REGISTER_MUTATION,
      variables: { registerInput },
    });

    if (!data?.register) {
      throw new Error('Registration failed');
    }

    this.setToken(data.register.accessToken);
    return data.register;
  }

  static async getCurrentUser(client: ApolloClient): Promise<User | null> {
    try {
      const { data } = await client.query<MeQueryResponse>({
        query: ME_QUERY,
        fetchPolicy: 'network-only',
      });

      return data?.me || null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      this.removeToken();
      return null;
    }
  }

  static logout(): void {
    this.removeToken();
  }
}
