import { postTestCase } from '@/api/testcase.api';
import {
  FormButton,
  FormInput,
  FormSearchSelect,
  FormTextArea,
  FormSelect,
} from '@/components/form';
import Level from '@/components/Level';
import { addTestCase, ProjectContext } from '@/contexts/ProjectContext';
import { useFormInput } from '@/hooks/useFormInput';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { resolveInheritance } from '@/utils';
import {
  Button,
  Col,
  Divider,
  Form,
  List,
  notification,
  Row,
  Select,
  Tag,
  Icon,
} from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

const Option = Select.Option;

interface Params {
  pid: string;
}

const ExecutionSetup: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const [{ testCases }] = useContext(ProjectContext);

  const [type, setType] = useState('');
  const [testCase, setTestCase] = useState<TestCase | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTestCaseSelect = (id: string) => {
    const testCaseNew = testCases.find((_testCase) => _testCase._id === id);
    setTestCase(testCaseNew || null);
  };

  const handleSubmit = () => {
    console.log('Handle Submit');
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <FormSelect
              label="Type"
              value={type}
              onChange={setType}
              required={true}
            >
              <Option value="testcase">Test Case</Option>
              <Option value="testset">Test Set</Option>
              <Option value="cycle">Cycle</Option>
            </FormSelect>
            <FormSearchSelect
              label="Test Case"
              placeholder="None"
              value={(testCase && testCase._id) || ''}
              onChange={handleTestCaseSelect}
            >
              {testCases.map((_testCase, index) => (
                <Option key={index} value={_testCase._id}>
                  {_testCase.title}
                </Option>
              ))}
            </FormSearchSelect>
            <FormButton type="primary" loading={isLoading}>
              Start
              <Icon type="right" />
            </FormButton>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(ExecutionSetup);
