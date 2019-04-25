import { logout } from '@/api/auth.api';
import { CycleContext } from '@/contexts/CycleContext';
import { ProjectContext } from '@/contexts/ProjectContext';
import { UserContext } from '@/contexts/UserContext';
import { useFormInput } from '@/hooks/useFormInput';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import logo from '@/images/sprova.svg';
import { Button, Form, Icon, notification, Select, Spin, Divider } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './SideMenu.scss';
import Modal from '@/components/Modal';
import { FormInput, FormTextArea, FormButton } from '@/components/form';
import { Cycle } from '@/models/Cycle';
import { postCycle } from '@/api/cycle.api';

const Option = Select.Option;

const SideMenu: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const { currentCycle, cycles, isCyclesLoading, onAddCycle } = useContext(
    CycleContext
  );
  const { currentProject, isProjectsLoading } = useContext(ProjectContext);
  const { user, onLogout } = useContext(UserContext);

  const { value: cycleTitle, setValue: setCycleTitle } = useFormInput('');
  const {
    value: cycleDescription,
    setValue: setCycleDescription,
  } = useFormTextArea('');

  const [isCycleModalOpen, setIsCycleModalOpen] = useState(false);
  const [isCycleSubmitLoading, setIsCycleSubmitLoading] = useState(false);

  const signout = () => {
    logout();
    onLogout();
    history.push('/login');
  };

  const handleCycleSubmit = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const cycleNew: Partial<Cycle> = {
      title: cycleTitle,
      description: cycleDescription,
      projectId: currentProject!._id,
    };

    setIsCycleSubmitLoading(true);

    try {
      const cycle = await postCycle(cycleNew);
      onAddCycle(cycle);
      setIsCycleModalOpen(false);
      setCycleTitle('');
      setCycleDescription('');
      notification.success({
        placement: 'bottomRight',
        message: `${cycleTitle} created`,
        description: `Cycle created with ID ${cycle._id}`,
      });
    } catch (error) {
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to create cycle',
        description: error,
      });
    } finally {
      setIsCycleSubmitLoading(false);
    }
  };

  const cycleModal = (
    <Modal
      title="Create New Cycle"
      open={isCycleModalOpen}
      onClose={() => setIsCycleModalOpen(false)}
    >
      <Form layout="vertical" onSubmit={handleCycleSubmit}>
        <FormInput
          label="Title"
          value={cycleTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCycleTitle(event.currentTarget.value)
          }
          placeholder="Cycle"
          required={true}
        />
        <FormTextArea
          value={cycleDescription}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCycleDescription(event.currentTarget.value)
          }
          label="Description"
          placeholder="Description"
          minLength={3}
        />
        <FormButton
          style={{ marginBottom: 0, paddingBottom: 0 }}
          type="primary"
          loading={isCycleSubmitLoading}
          disabled={!cycleTitle}
        >
          Create Cycle
        </FormButton>
      </Form>
    </Modal>
  );

  return (
    <Fragment>
      <div className="sprova-sidemenu">
        <div className="sprova-sidemenu-title">
          <img id="sprova-logo" src={logo} alt="logo" />
          <h3 id="sprova-project-title">
            {(currentProject && currentProject.title) || 'Sprova'}
          </h3>
        </div>

        <div className="sprova-sidemenu-menu">
          {isProjectsLoading || isCyclesLoading ? (
            <Spin />
          ) : currentProject ? (
            <Fragment>
              <div className="sprova-sidemenu-menu-section">Cycle</div>
              {currentCycle ? (
                <Select
                  defaultValue={currentCycle._id}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                      <div style={{ padding: '8px', cursor: 'pointer' }}>
                        <Icon type="plus" /> Add item
                      </div>
                    </div>
                  )}
                >
                  {cycles.map((cycle: Cycle) => (
                    <Option key={cycle._id} value={cycle._id}>
                      {cycle.title}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Fragment>
                  <Button
                    type="primary"
                    block={true}
                    onClick={() => setIsCycleModalOpen(true)}
                    style={{ marginTop: 8 }}
                  >
                    Create New Cycle
                  </Button>
                </Fragment>
              )}

              {currentCycle ? (
                <Fragment>
                  <div className="sprova-sidemenu-menu-section">Menu</div>
                  <ul>
                    <Link to={`/projects`}>
                      <li>
                        <Icon type="thunderbolt" style={{ marginRight: 8 }} />{' '}
                        Executions
                      </li>
                    </Link>
                    <Link to="/">
                      <li>
                        <Icon type="file-text" style={{ marginRight: 8 }} />{' '}
                        Test Cases
                      </li>
                    </Link>
                    <Link to="/">
                      <li>
                        <Icon type="folder" style={{ marginRight: 8 }} /> Test
                        Sets
                      </li>
                    </Link>
                  </ul>

                  <div className="sprova-sidemenu-menu-section">More</div>
                  <ul>
                    <Link to="/">
                      <li>
                        <Icon type="bell" style={{ marginRight: 8 }} />{' '}
                        Notifications
                      </li>
                    </Link>
                  </ul>
                </Fragment>
              ) : null}
            </Fragment>
          ) : null}
        </div>

        <div className="sprova-sidemenu-footer">
          <ul>
            <Link to="/">
              <li>
                <Icon type="user" style={{ marginRight: 8 }} /> {user!.username}
              </li>
            </Link>
            <Link to="/">
              <li>
                <Icon type="setting" style={{ marginRight: 8 }} /> Settings
              </li>
            </Link>
            <li>
              <a onClick={signout}>
                <Icon type="logout" style={{ marginRight: 8 }} /> Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
      {cycleModal}
    </Fragment>
  );
};

export default withRouter(SideMenu);
