import { logout } from '@/api/auth.api';
import { postProject } from '@/api/project.api';
import { FormButton, FormInput } from '@/components/form';
import Modal from '@/components/Modal';
import { ProjectContext } from '@/contexts/ProjectContext';
import { UserContext } from '@/contexts/UserContext';
import { useFormInput } from '@/hooks/useFormInput';
import { Project } from '@/models/Project';
import { Form, Icon, notification } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './ProjectBar.scss';
import ProjectBarItem from './ProjectBarItem';

const ProjectBar: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const {
    value: projectTitle,
    setValue: setProjectTitle,
    handleChange: handleProjectTitleChange,
  } = useFormInput('');
  const [isProjectSubmitLoading, setIsProjectSubmitLoading] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const {
    currentProject,
    onAddProject,
    onSelectProject,
    projects,
  } = useContext(ProjectContext);
  const { user, onLogout } = useContext(UserContext);

  const handleProjectSubmit = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const projectNew: Partial<Project> = {
      title: projectTitle,
      description: '',
      userId: user!._id,
    };

    setIsProjectSubmitLoading(true);

    try {
      const project = await postProject(projectNew);
      onAddProject(project);
      setIsProjectModalOpen(false);
      setProjectTitle('');
      notification.success({
        placement: 'bottomRight',
        message: `${project.title} created`,
        description: `Project created with ID ${project._id}`,
      });
    } catch (error) {
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to create project',
        description: error,
      });
    } finally {
      setIsProjectSubmitLoading(false);
    }
  };

  const handleProjectSelect = (project: Project) => {
    onSelectProject(project);
    history.push(`/projects/${project._id}`);
  };

  const getFirstCharCapitalized = (s: string) =>
    s.substring(0, 1).toUpperCase() || '?';

  const signout = () => {
    logout();
    onLogout();
    history.push('/login');
  };

  return (
    <Fragment>
      <div className="sprova-projectbar">
        <div className="sprova-projectbar-top">
          {projects &&
            projects.map((project: Project) => (
              <ProjectBarItem
                key={project._id}
                onClick={() => handleProjectSelect(project)}
                selected={
                  !!currentProject && currentProject._id === project._id
                }
                tooltip={project.title}
              >
                {getFirstCharCapitalized(project.title)}
              </ProjectBarItem>
            ))}
          <ProjectBarItem
            onClick={() => setIsProjectModalOpen(true)}
            tooltip="Create Project"
          >
            +
          </ProjectBarItem>
        </div>

        <div className="sprova-projectbar-bottom">
          <ProjectBarItem tooltip="Account">
            <Icon type="user" />
          </ProjectBarItem>
          <ProjectBarItem tooltip="Settings">
            <Icon type="setting" />
          </ProjectBarItem>
          <ProjectBarItem tooltip="Sign Out" onClick={signout}>
            <Icon type="logout" />
          </ProjectBarItem>
        </div>
      </div>

      <Modal
        title="Create New Project"
        open={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      >
        <Form layout="vertical" onSubmit={handleProjectSubmit}>
          <FormInput
            label="Title"
            value={projectTitle}
            onChange={handleProjectTitleChange}
            placeholder="Cycle"
            required={true}
          />
          <FormButton
            style={{ marginBottom: 0, paddingBottom: 0 }}
            type="primary"
            loading={isProjectSubmitLoading}
            disabled={!projectTitle}
          >
            Create Project
          </FormButton>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default withRouter(ProjectBar);
