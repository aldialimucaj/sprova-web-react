import { Project } from '@/models/Project';
import { AxiosError, AxiosResponse } from 'axios';
import agent from './agents/api.agent';

export async function getProjects(
  limit?: number,
  skip?: number,
  sort?: any
): Promise<Project[]> {
  return agent
    .get('/projects', {
      params: {
        limit,
        skip,
        sort,
      },
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
      (response: AxiosResponse): Project[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as Project[];
      }
    );
}

export function getProject(projectId: string): Promise<Project> {
  return agent
    .get(`/projects/${projectId}`)
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

export function deleteProject(id: string) {
  return agent
    .delete(`/projects/${id}`)
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
