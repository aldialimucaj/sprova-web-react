import { Execution } from '@/models/Execution';
import { AxiosError, AxiosResponse } from 'axios';
import agent from './agent';
import { ExecutionStep } from '@/models/ExecutionStep';

export function getExecutions(): Promise<Execution[]> {
  return agent
    .get('/executions')
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
      (response: AxiosResponse): Execution[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as Execution[];
      }
    );
}

export function getExecution(id: string): Promise<Execution> {
  return agent
    .get(`/executions/${id}`)
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
      (response: AxiosResponse): Execution => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as Execution;
      }
    );
}

export function getExecutionsOfContext(
  contextId: string,
  withTitle = false
): Promise<Execution[]> {
  return agent
    .get('/executions', {
      params: {
        contextId,
        withTitle,
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
      (response: AxiosResponse): Execution[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as Execution[];
      }
    );
}

export function getExecutionsOfTestCase(
  testCaseId: string
): Promise<Execution[]> {
  return agent
    .get('/executions', {
      params: {
        testCaseId,
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
      (response: AxiosResponse): Execution[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as Execution[];
      }
    );
}

export function postExecution(execution: Partial<Execution>) {
  return agent
    .post('/executions', execution)
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
      (response: AxiosResponse): Execution => {
        const { data, status, statusText } = response;
        if (status !== 201) {
          throw statusText;
        }
        return data as Execution;
      }
    );
}

export function putExecutionStep(
  executionId: string,
  executionStep: ExecutionStep
): Promise<ExecutionStep> {
  return agent
    .put(`/executions/${executionId}/steps`, executionStep)
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
      (response: AxiosResponse): ExecutionStep => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as ExecutionStep;
      }
    );
}

export function putExecutionSteps(
  executionId: string,
  executionSteps: ExecutionStep[]
): Promise<ExecutionStep[]> {
  return agent
    .put(`/executions/${executionId}/steps`, executionSteps)
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
      (response: AxiosResponse): ExecutionStep[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as ExecutionStep[];
      }
    );
}

export function postExecutions(executions: Array<Partial<Execution>>) {
  return agent
    .post('/executions', executions)
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
      (response: AxiosResponse): Execution[] => {
        const { data, status, statusText } = response;
        if (status !== 201) {
          throw statusText;
        }
        return data as Execution[];
      }
    );
}

export function deleteExecution(id: string) {
  return agent
    .delete(`/executions/${id}`)
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
