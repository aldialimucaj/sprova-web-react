import { Button, Col, Form, Icon, Input, List, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';
import { TestStep } from '../../models/TestStep';
import TestStepInput from './TestStepInput';
import { formContentLayout, formItemLayout, tailFormItemLayout } from './utils';

const { TextArea } = Input;

interface Props extends RouteComponentProps, FormComponentProps {}

const CreateTestCase: React.FunctionComponent<Props> = ({ form }) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
              {getFieldDecorator('inherit', {})(
                <Select mode="tags" placeholder="None">
                  {[]}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Test Steps"
              required={true}
              validateStatus={/* TODO: */ 'success'}
            >
              <TestStepInput parent={null} />
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
