import { TestStep } from './TestStep';

export interface TestCase {
  _id: string;
  title: string;
  description: string;
  projectId: string;
  steps: TestStep[];
  createdAt: Date;
  parentId?: string;
}
