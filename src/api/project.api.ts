import { AxiosError, AxiosResponse } from 'axios';
import agent from './agent';

export default {
  getProject,
  getProjects,
};

function getProject() {
  // TODO:
}

function getProjects() {
  return agent
    .get('/projects')
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
        // TODO:
        const { data, status, statusText } = response;
        const { error, token } = data;
        if (status != 200) {
          throw error || statusText;
        }
        return token;
      }
    );
}
