import axios from 'axios';

const URL = 'http://localhost:8181/api/';

const getToken = () => localStorage.getItem('token');

const formatToken = (token: string | null) => {
  return token && `Bearer ${token}`;
};

export const setToken = (token: string | null) => {
  agent.defaults.headers.Authorization = formatToken(token);
};

const agent = axios.create({
  baseURL: URL,
  headers: {
    Authorization: formatToken(getToken()),
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default agent;
