import { ExecutionContext } from '@/models/ExecutionContext';
import { AxiosError, AxiosResponse } from 'axios';
import agent from './agent';

export function postExecutionContext(executionContext: ExecutionContext) {
  return agent
    .post('/execution-contexts', executionContext)
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

export function deleteExecutionContext(id: string) {
  return agent
    .delete(`/execution-contexts/${id}`)
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

export function getExecutions(projectId: string): Promise<ExecutionContext[]> {
  return agent
    .get('/execution-contexts', {
      params: {
        projectId,
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
      (response: AxiosResponse): ExecutionContext[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as ExecutionContext[];
      }
    );
}
