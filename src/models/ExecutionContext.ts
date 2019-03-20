export interface ExecutionContext {
  _id?: string;
  userId: string;
  type: 'manual' | 'automated';
  status: 'active' | 'inactive' | 'waiting' | 'finished';
  startedAt?: Date;
  finishedAt?: Date;
}
