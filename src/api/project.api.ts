import { message as MessageProvider } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { Project } from '../models/Project';
import agent from './agent';

export function postProject(project: Project) {
  return agent
    .post('/projects', project)
    .catch(
      (error: AxiosError): AxiosResponse => {
        const { message, response } = error;
        MessageProvider.error(message, 10);
        if (!response) {
          throw message;
        }
        return response;
      }
    )
    .then(
      (response: AxiosResponse): Project => {
        const { data, status, statusText } = response;
        if (status !== 201) {
          throw statusText;
        }
        return data as Project;
      }
    );
}

export function getProject() {
  // TODO:
}

export function getProjects() {
  return agent
    .get('/projects')
    .catch(
      (error: AxiosError): AxiosResponse => {
        const { message, response } = error;
        MessageProvider.error(message, 10);
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
        if (status !== 200) {
          throw error || statusText;
        }
        console.log("projects")

        return token;
      }
    );
}
