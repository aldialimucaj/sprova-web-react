export interface Execution {
  _id?: string;
  testcaseId: string;
  result: 'failed' | 'warning' | 'success';
  status: 'active' | 'inactive' | 'waiting' | 'finished';
  startedAt?: Date;
  finishedAt?: Date;
}
