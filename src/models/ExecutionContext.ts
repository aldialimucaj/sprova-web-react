export interface ExecutionContext {
  _id?: string;
  userId: string;
  type: 'cycle' | 'testset' | 'testcase';
  method: 'manual' | 'automated';
  status: 'active' | 'inactive' | 'waiting' | 'finished';
  startedAt?: Date;
  finishedAt?: Date;
}
