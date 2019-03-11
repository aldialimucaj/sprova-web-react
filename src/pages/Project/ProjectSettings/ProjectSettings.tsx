import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { deleteProject, updateProject } from '../../../api/project.api';
import SectionHeader from '../../../components/SectionHeader';
import ProjectContext from '../../../contexts/ProjectContext';
import { Project } from '../../../models/Project';

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
  const { getFieldDecorator, getFieldsError, validateFields } = form;
  const { project, setProject } = useContext(ProjectContext);

  const deleteRequest = async () => {
    try {
      await deleteProject(project._id || match.params.id);
      history.push('/projects');
    } catch (e) {
      // TODO: Handle error
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateFields(async (errors, values) => {
      if (!errors) {
        // TODO: Handle form validation error
      }

      const { projectTitle: title, description } = values;

      const projectNew: Project = {
        ...project,
        title,
        description,
      };
      try {
        await updateProject(projectNew);
        setProject(projectNew);
      } catch (e) {
        // TODO: Handle error
      }
    });
    // TODO: Update project
  };

  const hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  const formItemLayout = {
    labelCol: {
      sm: { span: 8 },
      xs: { span: 24 },
    },
    wrapperCol: {
      sm: { span: 16 },
      xs: { span: 24 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
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
            <Button type="danger">Delete</Button>
          </Popconfirm>
        }
      />
      <Row>
        <Col xs={24} lg={12}>
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
