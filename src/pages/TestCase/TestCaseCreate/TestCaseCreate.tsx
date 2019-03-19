import { postTestCase } from '@/api/testcase.api';
import {
  FormButton,
  FormInput,
  FormSearchSelect,
  FormTextArea,
} from '@/components/form';
import SectionHeader from '@/components/SectionHeader';
import { addTestCase, ProjectContext } from '@/contexts/ProjectContext';
import { useFormInput } from '@/hooks/useFormInput';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { resolveInheritance } from '@/utils';
import { Button, Col, Form, List, notification, Row, Select, Tag } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';
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

  const { value: title, handleChange: handleTitleChange } = useFormInput('');
  const {
    value: description,
    handleChange: handleDescriptionChange,
  } = useFormTextArea('');
  const [parent, setParent] = useState<TestCase | null>(null);
  const [testSteps, setTestSteps] = useState<TestStep[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInherited, setShowInherited] = useState<boolean>(false);

  const handleParentSelect = (id: string) => {
    const parentNew = testCases.find((testCase) => testCase._id === id);
    setParent(parentNew || null);
  };

  const toggleShowInherited = () => {
    setShowInherited(!showInherited);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let testCaseNew: TestCase = {
      title,
      project: match.params.pid,
      description,
      steps: testSteps,
    };

    if (parent) {
      testCaseNew = { ...testCaseNew, parent: parent._id };
    }

    setIsLoading(true);

    try {
      const _id = await postTestCase(testCaseNew);
      setIsLoading(false);
      dispatch(addTestCase({ ...testCaseNew, _id }));
      notification.success({
        message: `${title} created`,
        description: `Test case created with ID ${_id}`,
      });
      history.push(`/projects/${match.params.pid}/testcases`);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: 'Failed to create test case',
        description: error,
      });
    }
  };

  const isFormValid = () => {
    return title.length > 0 && testSteps.length > 0;
  };

  return (
    <Fragment>
      <SectionHeader title="Create new test case" />
      <Row>
        <Col {...formContentLayout}>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <FormInput
              label="Title"
              value={title}
              onChange={handleTitleChange}
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
              value={(parent && parent._id) || ''}
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
                  dataSource={resolveInheritance(parent, testCases)}
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
              disabled={!isFormValid()}
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
