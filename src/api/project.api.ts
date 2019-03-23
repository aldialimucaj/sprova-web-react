import { Project } from '@/models/Project';
import { message as MessageProvider } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import agent from './agent';
import { ObjectId } from 'bson';

export function getProject(id: string): Promise<Project> {
  return agent
    .get(`/projects/${id}`)
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
      (response: AxiosResponse): Project => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as Project;
      }
    );
}

export function postProject(project: Partial<Project>) {
  return agent
    .post('/projects', project)
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
      (response: AxiosResponse): Project => {
        const { data, status, statusText } = response;
        if (status !== 201) {
          throw statusText;
        }
        return data as Project;
      }
    );
}

export function updateProject(project: Project) {
  return agent
    .put(`/projects/${project._id}`, project)
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
      (response: AxiosResponse): void => {
        const { data, status, statusText } = response;
        if (status !== 200 || !data.ok) {
          throw statusText;
        }
      }
    );
}

export function deleteProject(projectId: ObjectId) {
  return agent
    .delete(`/projects/${projectId}`)
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
      (response: AxiosResponse): boolean => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return !!data.ok;
      }
    );
}

export async function getProjects(
  limit?: number,
  skip?: number,
  sort?: any
): Promise<Project[]> {
  return agent
    .get('/projects', {
      params: { limit, skip, sort },
    })
    .then((response: AxiosResponse) => {
      return Promise.resolve(response.data);
    })
    .catch((error: AxiosError) => {
      const { message } = error;

      throw new Error(message);
    });
}

export async function filterProjects(
  query: any,
  options?: any
): Promise<Project[]> {
  return agent
    .post('/search/projects', { query, options })
    .then((response: AxiosResponse) => {
      return Promise.resolve(response.data);
    })
    .catch((error: AxiosError) => {
      const { message } = error;
      MessageProvider.error(message, 10);

      throw new Error(message);
    });
}
