export interface ExecutionContext {
  _id?: string;
  userId: string;
  projectId: string;
  type: 'cycle' | 'testset' | 'testcase';
  reference?: string;
  method: 'manual' | 'automated';
  status: 'active' | 'inactive' | 'waiting' | 'finished';
  createdAt?: Date;
  finishedAt?: Date;
  startedAt?: Date;
  updatedAt?: Date;
}
