export interface Execution {
  _id?: string;
  testcaseId: string;
  contextId: string;
  result: 'failed' | 'warning' | 'success' | null;
  status: 'active' | 'inactive' | 'waiting' | 'finished';
  startedAt?: Date;
  finishedAt?: Date;
}
