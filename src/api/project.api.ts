import { message as MessageProvider, notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { defaultProject } from '../contexts/ProjectContext';
import { Project } from '../models/Project';
import agent from './agent';

export function useGetProject(id: string) {
  const [project, setProject] = useState<Project>(defaultProject);
  const [projectId, setProjectId] = useState<string>(id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedProject = await getProject(projectId);
        setProject(fetchedProject);
      } catch (error) {
        notification.error({
          message: 'Failed to fetch project',
          description: error,
        });
      }

      setIsLoading(false);
    };

    fetchData();
  }, [projectId]);

  const doFetch = (idNew: string) => {
    setProjectId(idNew);
  };

  return { doFetch, isLoading, project, setProject };
}

export async function getProject(id: string): Promise<Project> {
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

export function updateProject(project: Project) {
  return agent
    .put(`/projects/${project._id}`, project)
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
    .then((response: AxiosResponse) => {
      const { data, status, statusText } = response;
      if (status !== 200) {
        throw statusText;
      }
      return data._id;
    });
}

export function deleteProject(projectId: string) {
  return agent
    .delete(`/projects/${projectId}`)
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
