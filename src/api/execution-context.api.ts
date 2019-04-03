import {
  ExecutionContext,
  ExecutionContextStatus,
} from '@/models/ExecutionContext';
import { AxiosError, AxiosResponse } from 'axios';
import agent from './agents/api.agent';

export function getExecutionContexts(
  projectId?: string
): Promise<ExecutionContext[]> {
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

export function getExecutionContext(id: string): Promise<ExecutionContext> {
  return agent
    .get(`/execution-contexts/${id}`)
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
      (response: AxiosResponse): ExecutionContext => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as ExecutionContext;
      }
    );
}

export function postExecutionContext(
  executionContext: Partial<ExecutionContext>
): Promise<ExecutionContext> {
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
      (response: AxiosResponse): ExecutionContext => {
        const { data, status, statusText } = response;
        if (status !== 201) {
          throw statusText;
        }
        return data as ExecutionContext;
      }
    );
}

export function putExecutionContextStatus(
  executionContextId: string,
  executionContextStatus: ExecutionContextStatus
): Promise<boolean> {
  return agent
    .put(`/execution-contexts/${executionContextId}/status`, {
      status: executionContextStatus,
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
      (response: AxiosResponse): boolean => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return !!data.ok;
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
