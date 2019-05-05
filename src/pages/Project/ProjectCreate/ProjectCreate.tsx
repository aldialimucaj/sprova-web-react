import { getUser } from '@/api/auth.api';
import { postProject } from '@/api/project.api';
import { FormButton, FormInput } from '@/components/form';
import { PageContent, PageHeader } from '@/components/Layout';
import { RichTextEditor } from '@/components/RichTextEditor';
import { useFormInput } from '@/hooks/useFormInput';
import { Project } from '@/models/Project';
import { Breadcrumb, Card, Col, Form, notification, Row } from 'antd';
import React, { Fragment, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { formContentLayout } from './utils';

const ProjectCreate: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
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
        placement: 'bottomRight',
        message: `${projectTitle} created`,
        description: `Project created with ID ${_id}`,
      });
      history.push(`/projects/${_id}`);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to create project',
        description: error,
      });
    }
  };

  return (
    <Fragment>
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <Link to={`/projects`}>
              <Breadcrumb.Item>Projects</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>New</Breadcrumb.Item>
          </Breadcrumb>
        }
        title="Create Project"
      />
      <PageContent>
        <Card>
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
        </Card>
      </PageContent>
    </Fragment>
  );
};

export default withRouter(ProjectCreate);
