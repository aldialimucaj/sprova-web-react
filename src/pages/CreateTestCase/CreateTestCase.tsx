import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  List,
  notification,
  Row,
  Select,
  Spin,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { postTestCase, useGetTestCases } from '../../api/testcase.api';
import SectionHeader from '../../components/SectionHeader';
import { ProjectContext } from '../../contexts/ProjectContext';
import { TestCase } from '../../models/TestCase';
import { TestStep } from '../../models/TestStep';
import TestStepInput from './TestStepInput';
import { formContentLayout, formItemLayout, tailFormItemLayout } from './utils';

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
  const [{ project, testCases }] = useContext(ProjectContext);
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const [testSteps, setTestSteps] = useState<TestStep[]>([]);
  const [parentId, setParentId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleParentSelect = (id: string) => {
    setParentId(id);
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

    if (parentId) {
      testCaseNew = { ...testCaseNew, parent: parentId };
    }

    setIsLoading(true);

    try {
      const id = await postTestCase(testCaseNew);
      setIsLoading(false);
      notification.success({
        message: `${title} created`,
        description: `Test case created with ID ${id}`,
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
              })(<Input type="text" name="title" />)}
            </Form.Item>
            <Form.Item label="Description" colon={false}>
              {getFieldDecorator('description', {})(
                <TextArea name="description" />
              )}
            </Form.Item>
            <Form.Item label="Inherit from" colon={false}>
              <Select
                allowClear={true}
                showSearch={true}
                value={parentId}
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
              <TestStepInput
                parent={parentId}
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
