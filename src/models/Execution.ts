import { ExecutionStep } from './ExecutionStep';

export interface Execution {
  _id: string;
  contextId: string;
  testCaseId: string;
  testCaseTitle?: string;
  result: ExecutionResult;
  status: ExecutionStatus;
  steps: ExecutionStep[];
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
}

export enum ExecutionStatus {
  Active = 'ACTIVE',
  Finished = 'FINISHED',
  Waiting = 'WAITING',
}

export enum ExecutionResult {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Successful = 'SUCCESSFUL',
  Warning = 'WARNING',
}
