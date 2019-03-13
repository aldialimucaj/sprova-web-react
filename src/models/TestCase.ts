import { TestStep } from './TestStep';

export interface TestCase {
  _id?: string;
  title: string;
  parent?: string;
  description: string;
  steps: TestStep[];
  project: string;
}
