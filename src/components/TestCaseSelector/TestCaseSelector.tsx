import { TestCase } from '@/models/TestCase';
import classnames from 'classnames';
import React, { useState } from 'react';
import TestCaseContainer from './TestCaseContainer';
import './TestCaseSelector.scss';
import { Icon, Tooltip } from 'antd';

interface Props {
  source: TestCase[];
  style?: any;
  target: TestCase[];
}

const TestCaseSelector: React.FunctionComponent<Props> = ({
  source,
  style,
  target,
}) => {
  const [sourceCases, setSourceCases] = useState<TestCase[]>(source);
  const [targetCases, setTargetCases] = useState<TestCase[]>(target);

  return (
    <div
      className={classnames('sprova-testcase-selector')}
      style={{ ...style }}
    >
      <TestCaseContainer
        title="Select Test Cases"
        testCases={source}
        style={{ flexGrow: 3 }}
      />
      <div
        style={{ flexGrow: 1 }}
        className={classnames('sprova-testcase-selector-middleman')}
      >
        <Tooltip placement="top" title="Remove all Test Cases">
          <button
            className={classnames('sprova-testcase-selector-middleman-mover')}
          >
            <Icon type="left" />
          </button>
        </Tooltip>
        <Tooltip placement="bottom" title="Add all Test Cases">
          <button
            className={classnames('sprova-testcase-selector-middleman-mover')}
          >
            <Icon type="right" />
          </button>
        </Tooltip>
      </div>
      <TestCaseContainer
        title="Selected Test Case"
        testCases={target}
        style={{ flexGrow: 3 }}
      />
    </div>
  );
};

export default TestCaseSelector;
