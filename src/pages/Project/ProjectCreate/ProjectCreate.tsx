import { getUser } from '@/api/auth.api';
import { postProject } from '@/api/project.api';
import { FormButton, FormInput } from '@/components/form';
import { RichTextEditor } from '@/components/RichTextEditor';
import SectionHeader from '@/components/SectionHeader';
import { useFormInput } from '@/hooks/useFormInput';
import { Project } from '@/models/Project';
import { Col, Form, notification, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { formContentLayout } from './utils';

interface Props extends RouteComponentProps, FormComponentProps {}

const ProjectCreate: React.FunctionComponent<Props> = ({ form, history }) => {
  const {
    value: projectTitle,
    handleChange: handleProjectTitleChange,
  } = useFormInput('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const editor = { value: {} };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { _id: userId } = getUser()!;

    const projectNew: Partial<Project> = {
      title: projectTitle,
      description: editor.value,
      userId,
    };

    setIsLoading(true);

    try {
      const { _id } = await postProject(projectNew);
      setIsLoading(false);
      notification.success({
        message: `${projectTitle} created`,
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
          <Form layout="vertical" onSubmit={handleSubmit}>
            <FormInput
              label="Project Title"
              value={projectTitle}
              onChange={handleProjectTitleChange}
              placeholder="Test Case"
              required={true}
            />
            <Form.Item label="Description" colon={false}>
              <RichTextEditor content={editor} />
            </Form.Item>
            <FormButton
              type="primary"
              loading={isLoading}
              disabled={!projectTitle}
            >
              Create Project
            </FormButton>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(Form.create({})(ProjectCreate));
