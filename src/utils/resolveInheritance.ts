import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { findById } from './findById';

/**
 * Resolve inherited test steps of the given test case.
 *
 * @param root Test case to resolve.
 * @param testCases List of test cases.
 */
export function resolveInheritance(
  root: TestCase,
  testCases: TestCase[]
): Array<[TestStep, TestCase]> {
  let steps: Array<[TestStep, TestCase]> = [];
  let parent: TestCase | undefined = findById(testCases, root.parent);
  while (parent) {
    const _steps = parent.steps.map(
      (step: TestStep) => [step, parent] as [TestStep, TestCase]
    );
    steps = [..._steps, ...steps];
    parent = findById(testCases, parent.parent);
  }
  return steps;
}
