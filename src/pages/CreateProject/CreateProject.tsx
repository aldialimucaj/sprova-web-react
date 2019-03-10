import { Alert, Button, Divider, Input, Spin } from 'antd';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { postProject } from '../../api/project.api';
import SectionHeader from '../../components/SectionHeader';
import { Project } from '../../models/Project';

const CreateProject: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'title': {
        setTitleValue(value);
        break;
      }
      case 'description': {
        setDescriptionValue(value);
        break;
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      createProject();
    }
  };

  const handleCancel = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push('/projects');
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createProject();
  };

  const createProject = () => {
    setIsLoading(true);
    const project: Project = {
      description: descriptionValue,
      title: titleValue,
    };
    postProject(project)
      .then(
        ({ _id }): void => {
          setIsLoading(false);
          history.push(`/projects/${_id}`);
        }
      )
      .catch(
        (err: string): void => {
          setIsLoading(false);
          setError(err);
        }
      );
  };

  return (
    <React.Fragment>
      <SectionHeader title="Create new project" />
      <Spin spinning={isLoading}>
        {error ? (
          <Alert
            className="form-item"
            type="error"
            message={error}
            closable={true}
            onClose={() => setError('')}
          />
        ) : null}
        <Input
          className="form-item"
          name="title"
          value={titleValue}
          placeholder="Project title"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <Input
          className="form-item"
          name="description"
          value={descriptionValue}
          placeholder="Description"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <Button
          className="form-item"
          type="primary"
          disabled={!(titleValue && descriptionValue)}
          onClick={handleSubmit}
        >
          Create
        </Button>

        <Button
          className="form-item"
          onClick={handleCancel}
          style={{ marginLeft: 16 }}
        >
          Cancel
        </Button>
      </Spin>
    </React.Fragment>
  );
};

export default withRouter(CreateProject);
