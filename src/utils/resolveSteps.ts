import { TestCase } from '../models/TestCase';
import { TestStep } from '../models/TestStep';
import { findById } from './findById';

export function resolveSteps(
  root: TestCase,
  testCases: TestCase[]
): Array<[TestStep, TestCase]> {
  let steps: Array<[TestStep, TestCase]> = [];
  let parent = root;
  while (parent) {
    const _steps = parent.steps.map(
      (step: TestStep) => [step, parent] as [TestStep, TestCase]
    );
    steps = [..._steps, ...steps];
    parent = findById(testCases, parent.parent);
  }
  return steps;
}
