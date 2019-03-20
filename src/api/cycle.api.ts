import { Cycle } from '@/models/Cycle';
import { AxiosError, AxiosResponse } from 'axios';
import agent from './agent';

export function postCycle(cycle: Cycle) {
  return agent
    .post('/cycles', cycle)
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

export function getCycles(): Promise<Cycle[]> {
  return agent
    .get('/cycles')
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
      (response: AxiosResponse): Cycle[] => {
        const { data, status, statusText } = response;
        if (status !== 200) {
          throw statusText;
        }
        return data as Cycle[];
      }
    );
}
