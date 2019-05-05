import { deleteProject, updateProject } from '@/api/project.api';
import { PageContent, PageHeader } from '@/components/Layout';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Project } from '@/models/Project';
import { hasFieldErrors } from '@/utils';
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Icon,
  Input,
  notification,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Fragment, useContext, useState } from 'react';
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { formContentLayout, formItemLayout, tailFormItemLayout } from './utils';

const { Text } = Typography;

interface Params {
  pid: string;
}

interface Props extends RouteComponentProps<Params>, FormComponentProps {}

const ProjectSettings: React.FunctionComponent<Props> = ({
  form,
  history,
  match,
}) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const { currentProject } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const editor = { value: currentProject && currentProject.description };

  if (!currentProject) {
    return <Redirect to="/projects" />;
  }

  const deleteRequest = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteProject(currentProject._id);
      setIsDeleteLoading(false);
      notification.success({
        placement: 'bottomRight',
        message: `${currentProject.title} deleted`,
      });
      history.push('/projects');
    } catch (error) {
      setIsDeleteLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to delete project',
        description: error,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const description = editor.value.toJSON();
    const { projectTitle: title } = getFieldsValue();
    const projectNew: Project = {
      ...currentProject,
      title,
      description,
    };

    setIsLoading(true);

    try {
      await updateProject(projectNew);
      setIsLoading(false);
      notification.success({
        placement: 'bottomRight',
        message: 'Project updated',
      });
    } catch (error) {
      setIsLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to update project',
        description: error,
      });
    }
  };

  const deleteButton = (
    <Popconfirm
      placement="bottomRight"
      title="Delete this project?"
      onConfirm={deleteRequest}
      icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
      okText="Yes"
      cancelText="Cancel"
    >
      <Button type="danger" loading={isDeleteLoading}>
        Delete
      </Button>
    </Popconfirm>
  );

  return (
    <Fragment>
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <Link to={`/projects/${match.params.pid}`}>
              <Breadcrumb.Item>{currentProject!.title}</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
          </Breadcrumb>
        }
        extra={deleteButton}
        title="Edit the Project"
      />
      <PageContent>
        <Row>
          <Col {...formContentLayout}>
            <Form {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item label="Project ID" colon={false}>
                <Text copyable={true} ellipsis={false}>
                  {currentProject._id}
                </Text>
              </Form.Item>
              <Form.Item label="Project Title" colon={false}>
                {getFieldDecorator('projectTitle', {
                  initialValue: currentProject.title,
                  rules: [
                    {
                      required: true,
                      message: 'Title cannot be empty',
                    },
                  ],
                })(<Input type="text" name="title" />)}
              </Form.Item>
              <Form.Item label="Description" colon={false}>
                <div
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e8e8e8',
                  }}
                >
                  <RichTextEditor content={editor} />
                </div>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  loading={isLoading}
                  htmlType="submit"
                  disabled={hasFieldErrors(getFieldsError())}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </PageContent>
    </Fragment>
  );
};

export default withRouter(Form.create({})(ProjectSettings));
