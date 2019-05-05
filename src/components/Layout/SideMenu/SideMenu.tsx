import Menu, { Item, NavItem, Section } from '@/components/Menu';
import { CycleContext } from '@/contexts/CycleContext';
import { ProjectContext } from '@/contexts/ProjectContext';
import logo from '@/images/sprova.svg';
import { Cycle } from '@/models/Cycle';
import { Button, Divider, Icon, Select, Spin } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './SideMenu.scss';

const Option = Select.Option;

const SideMenu: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const { currentCycle, cycles, isCyclesLoading } = useContext(CycleContext);
  const { currentProject, isProjectsLoading } = useContext(ProjectContext);

  return (
    <div className="sprova-sidemenu">
      <div
        className="sprova-sidemenu-title"
        onClick={() =>
          currentProject && history.push(`/projects/${currentProject._id}`)
        }
      >
        <img id="sprova-logo" src={logo} alt="logo" />
        <h3 id="sprova-project-title">
          {(currentProject && currentProject.title) || 'Sprova'}
        </h3>
      </div>

      <div className="sprova-sidemenu-menu">
        {isProjectsLoading || isCyclesLoading ? (
          <Spin />
        ) : currentProject ? (
          <Menu>
            <Section title="Cycle">
              {currentCycle ? (
                <Item>
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
                </Item>
              ) : (
                <Item>
                  <Link to={`/projects/${currentProject._id}/cycles/new`}>
                    <Button
                      type="primary"
                      block={true}
                      style={{ marginTop: 8 }}
                    >
                      Create New Cycle
                    </Button>
                  </Link>
                </Item>
              )}
            </Section>
            {currentCycle ? (
              <Fragment>
                <Section title="Menu">
                  <NavItem
                    icon={<Icon type="home" />}
                    exact={true}
                    route={`/projects/${currentProject._id}`}
                  >
                    Home
                  </NavItem>
                  <NavItem
                    icon={<Icon type="thunderbolt" />}
                    route={`/projects/${currentProject._id}/executions`}
                  >
                    Executions
                  </NavItem>
                  <NavItem
                    icon={<Icon type="file-text" />}
                    route={`/projects/${currentProject._id}/testcases`}
                  >
                    Test Cases
                  </NavItem>
                </Section>
                <Section title="More">
                  <NavItem
                    icon={<Icon type="setting" />}
                    route={`/projects/${currentProject._id}/settings`}
                  >
                    Project Settings
                  </NavItem>
                </Section>
              </Fragment>
            ) : null}
          </Menu>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(SideMenu);
