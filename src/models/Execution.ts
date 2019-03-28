import { ExecutionStep } from './ExecutionStep';

export interface Execution {
  _id: string;
  contextId: string;
  testCaseId: string;
  testCaseTitle?: string;
  status: ExecutionStatus;
  steps: ExecutionStep[];
  comments: ExecutionComment[];
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
}

export interface ExecutionComment {
  type: 'note' | 'warning';
  message: string;
  stepKey?: string;
}

export enum ExecutionStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Successful = 'SUCCESSFUL',
  Warning = 'WARNING',
}
