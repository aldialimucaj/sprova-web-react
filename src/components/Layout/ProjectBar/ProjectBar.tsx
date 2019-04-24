import { getProjects, postProject } from '@/api/project.api';
import Modal from '@/components/Modal';
import { useFetcher } from '@/hooks/useFetcher';
import { Project } from '@/models/Project';
import { Icon, Spin, Tooltip, Form, notification } from 'antd';
import React, { Fragment, useState } from 'react';
import './ProjectBar.scss';
import { FormInput, FormButton } from '@/components/form';
import { useFormInput } from '@/hooks/useFormInput';

const ProjectBar: React.FunctionComponent = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const {
    value: projectTitle,
    setValue: setProjectTitle,
    handleChange: handleProjectTitleChange,
  } = useFormInput('');
  const [isProjectSubmitLoading, setIsProjectSubmitLoading] = useState(false);
  const { data: projects, isLoading: isProjectsLoading, error } = useFetcher(
    getProjects
  );

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
      projects!.push(project);
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

  return (
    <Fragment>
      <div className="sprova-projectbar">
        {error ? (
          <div className="sprova-projectbar-error">
            <Icon type="warning" theme="filled" />
          </div>
        ) : isProjectsLoading ? (
          <Spin />
        ) : (
          <Fragment>
            {projects &&
              projects.map((project: Project) => (
                <Tooltip placement="right" title={project.title}>
                  <div className="sprova-projectbar-item">
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
          </Fragment>
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

export default ProjectBar;
