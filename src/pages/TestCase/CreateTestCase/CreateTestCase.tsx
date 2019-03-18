import { postTestCase } from '@/api/testcase.api';
import SectionHeader from '@/components/SectionHeader';
import { addTestCase, ProjectContext } from '@/contexts/ProjectContext';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { resolveSteps } from '@/utils/resolveSteps';
import {
  Button,
  Col,
  Form,
  Input,
  List,
  notification,
  Row,
  Select,
  Tag,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';
import TestStepInput from './TestStepInput';
import { formContentLayout } from './utils';

const Option = Select.Option;
const { TextArea } = Input;

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params>, FormComponentProps {}

const CreateTestCase: React.FunctionComponent<Props> = ({
  form,
  history,
  match,
}) => {
  const [{ project, testCases }, dispatch] = useContext(ProjectContext);
  const [testSteps, setTestSteps] = useState<TestStep[]>([]);
  const [parent, setParent] = useState<TestCase | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInherited, setShowInherited] = useState(false);
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;

  const handleParentSelect = (id: string | null) => {
    const parentNew = testCases.find((testCase) => testCase._id === id);
    setParent(parentNew || null);
  };

  const toggleShowInherited = () => {
    setShowInherited(!showInherited);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { title, description } = getFieldsValue();
    let testCaseNew: TestCase = {
      title: title as string,
      project: project._id || match.params.id,
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
      history.push(`/projects/${project._id || match.params.id}/testcases`);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: 'Failed to create test case',
        description: error,
      });
    }
  };

  const hasErrors = (fieldsError: any): boolean => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  return (
    <Fragment>
      <SectionHeader title="Create new test case" />
      <Row>
        <Col {...formContentLayout}>
          <Form layout="vertical" onSubmit={handleSubmit}>
            <Form.Item label="Title" colon={false}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Title cannot be empty',
                  },
                ],
              })(<Input type="text" name="title" placeholder="Test Case" />)}
            </Form.Item>
            <Form.Item label="Description" colon={false}>
              {getFieldDecorator('description', {})(
                <TextArea
                  minLength={3}
                  name="description"
                  placeholder="Description"
                />
              )}
            </Form.Item>
            <Form.Item label="Inherit from" colon={false}>
              <Select
                allowClear={true}
                showSearch={true}
                optionFilterProp="children"
                placeholder="None"
                onChange={handleParentSelect}
              >
                {testCases.map((testCase, index) => (
                  <Option key={index} value={testCase._id}>
                    {testCase.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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
                  dataSource={resolveSteps(parent, testCases)}
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
            <Form.Item>
              <Button
                type="primary"
                loading={isLoading}
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Create Test Case
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(Form.create({})(CreateTestCase));
