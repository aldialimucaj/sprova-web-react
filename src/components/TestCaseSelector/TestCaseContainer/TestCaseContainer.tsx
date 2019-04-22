import Card from '@/components/Card';
import { TestCase } from '@/models/TestCase';
import classnames from 'classnames';
import React from 'react';
import './TestCaseContainer.scss';
import { Icon } from 'antd';

interface Props {
  empty?: React.ReactNode;
  style?: any;
  testCases: TestCase[];
  title?: string;
}

const TestCaseContainer: React.FunctionComponent<Props> = ({
  empty,
  style,
  testCases,
  title,
}) => {
  return (
    <Card title={null} padded={false} style={{ ...style }}>
      <div className={classnames('sprova-testcase-container')}>
        <input
          className={classnames('sprova-testcase-container-search')}
          placeholder="Search"
        />
        {testCases.length > 0 ? (
          <ul className={classnames('sprova-testcase-container-list')}>
            {testCases.map((testCase: TestCase, index: number) => (
              <li
                key={index}
                className={classnames('sprova-testcase-container-list-entry')}
              >
                <div
                  className={classnames('sprova-testcase-container-list-item')}
                >
                  {testCase.title}
                </div>
                <div
                  className={classnames('sprova-testcase-container-list-arrow')}
                >
                  <Icon type="arrow-right" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={classnames('sprova-testcase-container-empty')}>
            {empty || (
              <span className={classnames('sprova-testcase-container-item')}>
                No data.
              </span>
            )}
          </div>
        )}
        <div className={classnames('sprova-testcase-container-footer')}>
          <a className={classnames('sprova-testcase-container-footer-action')}>
            Select all
          </a>
          <a className={classnames('sprova-testcase-container-footer-action')}>
            Select all
          </a>
        </div>
      </div>
    </Card>
  );
};

export default TestCaseContainer;
