import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { defaultProject } from '../contexts/ProjectContext';
import { Project } from '../models/Project';
import { TestCase } from '../models/TestCase';
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

export function postTestCase(project: Project) {
  return agent
    .post('/testcases', project)
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
        if (status !== 201 || !data.ok) {
          throw statusText;
        }
        return data._id as string;
      }
    );
}

export function useGetTestCases() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedTestCases = await getTestCases();
        setTestCases(fetchedTestCases);
      } catch (error) {
        notification.error({
          message: 'Failed to fetch testcases',
          description: error,
        });
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { testCases, isLoading };
}

export async function getTestCases(): Promise<TestCase[]> {
  return agent
    .get('/testcases')
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
      (response: AxiosResponse): TestCase[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as TestCase[];
      }
    );
}
