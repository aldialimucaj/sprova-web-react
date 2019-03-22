import { ObjectId } from 'bson';

export interface Cycle {
  _id: ObjectId;
  description: string;
  projectId: ObjectId;
  testCaseIds: ObjectId[];
  title: string;
}
