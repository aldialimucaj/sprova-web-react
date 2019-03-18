import { postProject } from '@/api/project.api';
import { RichTextEditor } from '@/components/RichTextEditor';
import SectionHeader from '@/components/SectionHeader';
import { Project } from '@/models/Project';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { formContentLayout, formItemLayout, tailFormItemLayout } from './utils';

const { TextArea } = Input;

interface Props extends RouteComponentProps, FormComponentProps {}

const CreateProject: React.FunctionComponent<Props> = ({ form, history }) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { projectTitle: title, description } = getFieldsValue();
    const projectNew: Project = {
      title,
      description,
    };

    setIsLoading(true);

    try {
      const { _id } = await postProject(projectNew);
      setIsLoading(false);
      notification.success({
        message: `${title} created`,
        description: `Project created with ID ${_id}`,
      });
      history.push(`/projects/${_id}`);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: 'Failed to create project',
        description: error,
      });
    }
  };

  const hasErrors = (fieldsError: any): boolean => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  return (
    <React.Fragment>
      <SectionHeader title="Create new project" />
      <Row>
        <Col {...formContentLayout}>
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item label="Project Title" colon={false}>
              {getFieldDecorator('projectTitle', {
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
                <RichTextEditor value={'test'} />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                loading={isLoading}
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Create Project
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(Form.create({})(CreateProject));
