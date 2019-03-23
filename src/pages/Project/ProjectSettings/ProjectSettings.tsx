import { deleteProject, updateProject } from '@/api/project.api';
import { RichTextEditor } from '@/components/RichTextEditor';
import SectionHeader from '@/components/SectionHeader';
import {
  ProjectContext,
  resetProject,
  setProject,
} from '@/contexts/ProjectContext';
import { Project } from '@/models/Project';
import { hasFieldErrors } from '@/utils';
import {
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
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { formContentLayout, formItemLayout, tailFormItemLayout } from './utils';

const { Text } = Typography;

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params>, FormComponentProps {}

const ProjectSettings: React.FunctionComponent<Props> = ({
  form,
  history,
  match,
}) => {
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;
  const [{ project }, dispatch] = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const editor = { value: project && project.description };

  if (!project) {
    return <Redirect to="/projects" />;
  }

  const deleteRequest = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteProject(project._id);
      setIsDeleteLoading(false);
      notification.success({
        message: `${project.title} deleted`,
      });
      dispatch(resetProject());
      history.push('/projects');
    } catch (error) {
      setIsDeleteLoading(false);
      notification.error({
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
      ...project,
      title,
      description,
    };

    setIsLoading(true);

    try {
      await updateProject(projectNew);
      setIsLoading(false);
      dispatch(setProject(projectNew));
      notification.success({
        message: 'Project updated',
      });
    } catch (error) {
      setIsLoading(false);
      notification.error({
        message: 'Failed to update project',
        description: error,
      });
    }
  };

  return (
    <Fragment>
      <SectionHeader
        title="Project Settings"
        extra={
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
        }
      />
      <Row>
        <Col {...formContentLayout}>
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item label="Project ID" colon={false}>
              <Text copyable={true} ellipsis={false}>
                {project._id}
              </Text>
            </Form.Item>
            <Form.Item label="Project Title" colon={false}>
              {getFieldDecorator('projectTitle', {
                initialValue: project.title,
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
                style={{ backgroundColor: '#fff', border: '1px solid #e8e8e8' }}
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
    </Fragment>
  );
};

export default withRouter(Form.create({})(ProjectSettings));
