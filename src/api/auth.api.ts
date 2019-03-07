import axios, { AxiosError, AxiosResponse } from 'axios';
import decode from 'jwt-decode';
import { setToken } from './agent';

export default {
  authenticate,
  getUsername,
  isAuthenticated,
  logout,
};

export interface DecodedToken {
  _id: string;
  exp: number;
  iat: number;
  username: string;
}

function authenticate(
  username: string,
  password: string
): Promise<DecodedToken> {
  return (
    axios
      // TODO: extract URL
      .post('http://localhost:8181/authenticate', {
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
        (token: string): DecodedToken => {
          localStorage.setItem('token', token);
          setToken(token);

          return decode(token) as DecodedToken;
        }
      )
  );
}

function getUsername(): string {
  const token = localStorage.getItem('token');
  return token ? (decode(token) as DecodedToken).username : '';
}

function isAuthenticated(): boolean {
  const token = localStorage.getItem('token');

  return !!token && !isTokenExpired(token);
}

function isTokenExpired(token: string): boolean {
  // TODO: Implement
  return false;
}

function logout(): void {
  localStorage.removeItem('token');
  setToken(null);
}
