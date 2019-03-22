import { ObjectId } from 'bson';

export interface ExecutionContext {
  _id: ObjectId;
  userId: ObjectId;
  projectId: ObjectId;
  type: ExecutionType;
  reference?: ObjectId;
  method: ExecutionMethod;
  status: ExecutionContextStatus;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
}

export enum ExecutionContextStatus {
  Active = 'ACTIVE',
  Finished = 'FINISHED',
  Scheduled = 'SCHEDULED',
}

export interface ExecutionMethod {
  Automated: 'AUTOMATED';
  Manual: 'MANUAL';
}

export interface ExecutionType {
  Cycle: 'CYCLE';
  TestSet: 'TESTSET';
  TestCases: 'TESTCASES';
}
