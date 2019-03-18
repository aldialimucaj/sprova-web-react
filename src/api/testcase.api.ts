import { TestCase } from '@/models/TestCase';
import { AxiosError, AxiosResponse } from 'axios';
import {
  ProjectAction,
  setTestCases,
} from '../contexts/ProjectContext/ProjectActions';
import agent from './agent';

export function postTestCase(testCase: TestCase) {
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
      (response: AxiosResponse): string => {
        const { data, status, statusText } = response;
        if (status !== 201 || !data.ok) {
          throw statusText;
        }
        return data._id as string;
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

export function getTestCases(): Promise<TestCase[]> {
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
