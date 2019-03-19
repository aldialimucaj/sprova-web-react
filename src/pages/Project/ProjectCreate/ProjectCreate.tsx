import { postProject } from '@/api/project.api';
import { RichTextEditor } from '@/components/RichTextEditor';
import SectionHeader from '@/components/SectionHeader';
import { Project } from '@/models/Project';
import { hasFieldErrors } from '@/utils';
import { Button, Col, Form, Input, notification, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { formContentLayout, formItemLayout, tailFormItemLayout } from './utils';

interface Props extends RouteComponentProps, FormComponentProps {}

const ProjectCreate: React.FunctionComponent<Props> = ({ form, history }) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const [isLoading, setIsLoading] = useState(false);
  const editor = { value: {} };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { projectTitle: title } = getFieldsValue();
    const projectNew: Project = {
      title,
      description: editor.value,
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
              <RichTextEditor content={editor} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                loading={isLoading}
                htmlType="submit"
                disabled={hasFieldErrors(getFieldsError())}
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

export default withRouter(Form.create({})(ProjectCreate));
