import { postProject } from '@/api/project.api';
import { FormButton, FormInput } from '@/components/form';
import Modal from '@/components/Modal';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFormInput } from '@/hooks/useFormInput';
import { Project } from '@/models/Project';
import { Form, Icon, notification, Tooltip } from 'antd';
import cx from 'classnames';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './ProjectBar.scss';

const ProjectBar: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const {
    value: projectTitle,
    setValue: setProjectTitle,
    handleChange: handleProjectTitleChange,
  } = useFormInput('');
  const [isProjectSubmitLoading, setIsProjectSubmitLoading] = useState(false);

  const {
    currentProject,
    onAddProject,
    onSelectProject,
    projects,
  } = useContext(ProjectContext);

  const getFirstCharCapitalized = (s: string) =>
    s.substring(0, 1).toUpperCase() || '?';

  const handleProjectSubmit = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const projectNew: Partial<Project> = {
      title: projectTitle,
      description: '',
      // TODO: Implement UserContext, then -> userId: currentUser._id,
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

  return (
    <Fragment>
      <div className="sprova-projectbar">
        {projects &&
          projects.map((project: Project) => (
            <Tooltip key={project._id} placement="right" title={project.title}>
              <div
                className={cx('sprova-projectbar-item', {
                  'is-selected':
                    currentProject && currentProject._id === project._id,
                })}
                onClick={() => handleProjectSelect(project)}
              >
                {getFirstCharCapitalized(project.title)}
              </div>
            </Tooltip>
          ))}
        <div
          className="sprova-projectbar-add"
          onClick={() => setIsProjectModalOpen(true)}
        >
          <Icon type="plus" />
        </div>
        )}
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
