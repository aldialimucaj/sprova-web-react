import { Cycle } from '@/models/Cycle';
import { AxiosResponse } from 'axios';
import agent from './agents/api.agent';
import axiosErrorHandler from './utils/axiosErrorHandler';

export function postCycle(cycle: Cycle) {
  return agent
    .post('/cycles', cycle)
    .catch(axiosErrorHandler)
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
    .catch(axiosErrorHandler)
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
