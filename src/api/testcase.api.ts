import { TestCase } from '@/models/TestCase';
import { AxiosError, AxiosResponse } from 'axios';
import agent from './agents/api.agent';

export function getTestCases(projectId: string): Promise<TestCase[]> {
  return agent
    .get('/testcases', {
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
      (response: AxiosResponse): TestCase[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as TestCase[];
      }
    );
}

export function getTestCase(id: string): Promise<TestCase> {
  return agent
    .get(`/testcases/${id}`)
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
      (response: AxiosResponse): TestCase => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as TestCase;
      }
    );
}

export function postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
  return agent
    .post('/testcases', testCase)
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
      (response: AxiosResponse): TestCase => {
        const { data, status, statusText } = response;
        if (status !== 201) {
          throw statusText;
        }
        return data as TestCase;
      }
    );
}

export function deleteTestCase(id: string) {
  return agent
    .delete(`/testcases/${id}`)
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
