import { getTestCases } from '@/api/testcase.api';
import { TestCase } from '@/models/TestCase';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { CycleContext } from './CycleContext';
import { ProjectContext } from './ProjectContext';

interface TestCaseContext {
  error: string | null;
  isTestCasesLoading: boolean;
  onAddTestCase: (testCase: TestCase) => void;
  onRemoveTestCase: (testCase: TestCase) => void;
  testCases: TestCase[];
}

const initialContext: TestCaseContext = {
  error: null,
  isTestCasesLoading: false,
  onAddTestCase: () => {},
  onRemoveTestCase: () => {},
  testCases: [],
};

const TestCaseContext = React.createContext<TestCaseContext>(initialContext);

const TestCaseProvider: React.FunctionComponent = ({ children }) => {
  const { currentProject } = useContext(ProjectContext);
  const { currentCycle } = useContext(CycleContext);

  const [error, setError] = useState<string | null>(null);
  const [isTestCasesLoading, setIsTestCasesLoading] = useState<boolean>(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  useEffect(() => {
    if (!(currentProject && currentCycle)) {
      return;
    }

    const fetchCycles = async () => {
      setIsTestCasesLoading(true);
      setError('');

      try {
        const fetchedTestCases = await getTestCases(
          currentProject._id /* TODO: , currentCycle._id*/
        );
        setTestCases(fetchedTestCases);
      } catch (error) {
        setError(error);
      } finally {
        setIsTestCasesLoading(false);
      }
    };

    fetchCycles();
  }, [currentProject, currentCycle]);

  const handleAddTestCase = (testCase: TestCase) => {
    setTestCases([...testCases, testCase]);
  };

  const handleRemoveTestCase = (testCase: TestCase) => {
    setTestCases(_.without(testCases, testCase));
  };

  return (
    <TestCaseContext.Provider
      value={{
        error,
        isTestCasesLoading,
        onAddTestCase: handleAddTestCase,
        onRemoveTestCase: handleRemoveTestCase,
        testCases,
      }}
    >
      {children}
    </TestCaseContext.Provider>
  );
};

export { TestCaseProvider, TestCaseContext };
