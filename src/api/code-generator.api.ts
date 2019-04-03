import { AxiosError, AxiosResponse } from 'axios';
import agent from './agents/api.agent';

export async function getGeneratedTestCase(
  testCaseId: string,
  language: string
) {
  return await agent
    .get(`/generators/${language}/testcases/${testCaseId}`)
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
        if (status !== 200 || !data.ok) {
          throw statusText;
        }
        return data.content as string;
      }
    );
}
