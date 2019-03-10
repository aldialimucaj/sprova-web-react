import { Button, Icon, Input, Popconfirm } from 'antd';
import React, { useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { deleteProject } from '../../../api/project.api';
import SectionHeader from '../../../components/SectionHeader';
import ProjectContext from '../../../contexts/ProjectContext';

interface Params {
  id: string;
}

const ProjectSettings: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  history,
}) => {
  const { project } = useContext(ProjectContext);
  const [title, setTitle] = useState<string>(project.title);
  const [description, setDescription] = useState<string>(project.description);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'title': {
        setTitle(value);
        break;
      }
      case 'description': {
        setDescription(value);
        break;
      }
    }
  };

  const deleteRequest = async () => {
    try {
      await deleteProject(project._id || match.params.id);
      history.push('/projects');
    } catch (e) {
      // TODO: Handle error
    }
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
      <Input type="text" name="title" value={title} onChange={handleChange} />
      <Input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <Button type="primary">Save</Button>
      <Button>Cancel</Button>
    </React.Fragment>
  );
};

export default withRouter(ProjectSettings);
