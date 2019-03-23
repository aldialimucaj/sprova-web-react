import { ObjectId } from 'bson';
import { TestStep } from './TestStep';

export interface TestCase {
  _id: ObjectId;
  title: string;
  description: string;
  projectId: ObjectId;
  steps: TestStep[];
  createdAt: Date;
  parentId?: ObjectId;
}
