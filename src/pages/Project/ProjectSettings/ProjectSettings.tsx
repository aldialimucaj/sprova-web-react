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
import React, { useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { deleteProject, updateProject } from '../../../api/project.api';
import SectionHeader from '../../../components/SectionHeader';
import ProjectContext from '../../../contexts/ProjectContext';
import { Project } from '../../../models/Project';
import { formContentLayout, formItemLayout, tailFormItemLayout } from './utils';

const { TextArea } = Input;
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
  const { project, setProject } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const deleteRequest = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteProject(project._id || match.params.id);
      setIsDeleteLoading(false);
      notification.success({
        message: `${project.title} deleted`,
      });
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
    const { projectTitle: title, description } = getFieldsValue();
    const projectNew: Project = {
      ...project,
      title,
      description,
    };

    setIsLoading(true);

    try {
      await updateProject(projectNew);
      setIsLoading(false);
      setProject(projectNew);
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

  const hasErrors = (fieldsError: any): boolean => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  return (
    <React.Fragment>
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
              {getFieldDecorator('description', {
                initialValue: project.description,
              })(<TextArea name="description" />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                loading={isLoading}
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(Form.create({})(ProjectSettings));
