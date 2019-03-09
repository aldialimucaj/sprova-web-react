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

export async function getProject(projectId: string): Promise<Project> {
  return await agent
    .get('/projects/' + projectId)
    .then(
      (response: AxiosResponse) => {
        return Promise.resolve(response.data);
      }
    ).catch(
      (error: AxiosError) => {
        const { message } = error;
        MessageProvider.error(message, 10);

        throw new Error(message);
      }
    );
}

export async function getProjects(): Promise<Project[]> {
  return await agent
    .get('/projects')
    .then(
      (response: AxiosResponse) => {
        return Promise.resolve(response.data);
      }
    ).catch(
      (error: AxiosError) => {
        const { message } = error;
        MessageProvider.error(message, 10);

        throw new Error(message);
      }
    );
}
