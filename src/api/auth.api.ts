import { User } from '@/models/User';
import { AxiosError, AxiosResponse } from 'axios';
import decode from 'jwt-decode';
import { setToken } from './agents/api.agent';
import authAgent from './agents/auth.agent';

export function authenticate(
  username: string,
  password: string
): Promise<User> {
  return authAgent
    .post('authenticate', {
      password,
      username,
    })
    .catch(
      (error: AxiosError): AxiosResponse => {
        const { message, response } = error;
        if (!response) {
          throw message;
        }
        return response;
      }
    )
    .then(
      (response: AxiosResponse): string => {
        const { data, status, statusText } = response;
        const { error, token } = data;
        if (status !== 200) {
          throw error || statusText;
        }
        return token;
      }
    )
    .then(
      (token: string): User => {
        localStorage.setItem('token', token);
        setToken(token);

        return decode(token) as User;
      }
    );
}

export function getUser(): User | null {
  const token = localStorage.getItem('token');
  return token ? (decode(token) as User) : null;
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token');

  return !!token && !isTokenExpired(token);
}

function isTokenExpired(token: string): boolean {
  // TODO: Implement
  return false;
}

export function logout(): void {
  localStorage.removeItem('token');
  setToken(null);
}
