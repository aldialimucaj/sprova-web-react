export interface Execution {
  _id?: string;
  testcaseId: string;
  userId: string;
  type: 'manual' | 'automated';
  result: 'failed' | 'warning' | 'success';
  status: 'active' | 'inactive' | 'waiting' | 'finished';
  startedAt?: Date;
  finishedAt?: Date;
}
