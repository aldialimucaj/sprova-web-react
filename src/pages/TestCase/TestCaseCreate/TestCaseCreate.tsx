import { postTestCase } from '@/api/testcase.api';
import {
  FormButton,
  FormInput,
  FormSearchSelect,
  FormTextArea,
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
} from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './TestCaseCreate.scss';
import TestStepInput from './TestStepInput';
import { formContentLayout } from './utils';

const Option = Select.Option;

interface Params {
  pid: string;
}

const TestCaseCreate: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const [{ testCases }, dispatch] = useContext(ProjectContext);

  const {
    value: testCaseTitle,
    handleChange: handleTestCaseTitleChange,
  } = useFormInput('');
  const {
    value: description,
    handleChange: handleDescriptionChange,
  } = useFormTextArea('');
  const [parent, setParent] = useState<TestCase | null>(null);
  const [testSteps, setTestSteps] = useState<TestStep[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInherited, setShowInherited] = useState<boolean>(false);

  const handleParentSelect = (parentIdString: string) => {
    const parentId = parentIdString;
    const parentNew = testCases.find((testCase) => testCase._id === parentId);
    setParent(parentNew || null);
  };

  const toggleShowInherited = () => {
    setShowInherited(!showInherited);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const testCaseNew: Partial<TestCase> = {
      title: testCaseTitle,
      description,
      projectId: match.params.pid,
      steps: testSteps,
    };

    if (parent) {
      testCaseNew.parentId = parent._id;
    }

    setIsLoading(true);

    try {
      const testCase = await postTestCase(testCaseNew);
      setIsLoading(false);
      dispatch(addTestCase(testCase));
      notification.success({
        placement: 'bottomRight',
        message: `${testCase.title} created`,
        description: `Test case created with ID ${testCase._id}`,
      });
      history.push(`/projects/${match.params.pid}/testcases`);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to create test case',
        description: error,
      });
    }
  };

  return (
    <Fragment>
      <Level
        left={
          <span style={{ fontSize: 18 }}>
            <Link to={`/projects/${match.params.pid}/testcases`}>
              Test Cases
            </Link>{' '}
            / <strong>Create Test Case</strong>
          </span>
        }
      />
      <Divider />
      <Row>
        <Col {...formContentLayout}>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <FormInput
              label="Title"
              value={testCaseTitle}
              onChange={handleTestCaseTitleChange}
              placeholder="Test Case"
              required={true}
            />
            <FormTextArea
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Description"
              minLength={3}
            />
            <FormSearchSelect
              label="Inherit from"
              placeholder="None"
              value={(parent && parent._id) || undefined}
              onChange={handleParentSelect}
            >
              {testCases.map((testCase, index) => (
                <Option key={index} value={testCase._id}>
                  {testCase.title}
                </Option>
              ))}
            </FormSearchSelect>
            <Form.Item
              label="Test Steps"
              required={true}
              validateStatus={'success'}
            >
              {parent ? (
                <Button
                  block={true}
                  onClick={toggleShowInherited}
                  type="dashed"
                  style={{ marginBottom: 16 }}
                >
                  {`${showInherited ? 'Hide' : 'Show'} inherited steps`}
                </Button>
              ) : null}

              {parent && showInherited ? (
                <List
                  className="inherited-list"
                  itemLayout="horizontal"
                  bordered={true}
                  dataSource={resolveInheritance(parent, testCases, true)}
                  renderItem={([testStep, mappedParent]: [
                    TestStep,
                    TestCase
                  ]) => (
                    <List.Item
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.025)' }}
                    >
                      <List.Item.Meta
                        title={testStep.action}
                        description={`Expected: ${testStep.expected}`}
                      />
                      <Tag style={{ pointerEvents: 'none' }}>
                        {mappedParent.title}
                      </Tag>
                    </List.Item>
                  )}
                />
              ) : null}
              <TestStepInput
                testSteps={testSteps}
                setTestSteps={setTestSteps}
              />
            </Form.Item>
            <FormButton
              type="primary"
              loading={isLoading}
              disabled={!testCaseTitle || testSteps.length === 0}
            >
              Create Test Case
            </FormButton>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(TestCaseCreate);
