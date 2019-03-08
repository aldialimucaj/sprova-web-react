import { Alert, Button, Divider, Input, Spin } from 'antd';
import React, { useState } from 'react';
import projectApi from '../../api/project.api';
import { Project } from '../../models/Project';

const CreateProject: React.FunctionComponent<{}> = () => {
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
    projectApi
      .postProject(project)
      .then(
        (): void => {
          setIsLoading(false);
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
      <h2 style={{ marginTop: 16, marginBottom: 0 }}>Create new project</h2>
      <Divider />
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
      </Spin>
    </React.Fragment>
  );
};

export default CreateProject;
