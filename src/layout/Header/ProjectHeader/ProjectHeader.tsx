import { Project } from '@/models/Project';
import { Button, Col, Divider, Icon, Row, Select } from 'antd';
import React, { Fragment, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';

const { Option } = Select;

interface Params {
  pid: string;
}

interface Props extends RouteComponentProps<Params> {
  projects: Project[];
}

const ProjectHeader: React.FunctionComponent<Props> = ({
  match,
  projects,
  history,
}) => {
  const [currentProjectId, setCurrentProjectId] = useState<string>(
    match.params.pid
  );

  const handleProjectChange = (selectedProjectId: string) => {
    if (currentProjectId !== selectedProjectId) {
      setCurrentProjectId(selectedProjectId);
      history.push(`/projects/${selectedProjectId}`);
    }
  };

  return (
    <Fragment>
      <Row type="flex" justify="space-between">
        <Col>
          <Select value={currentProjectId} onChange={handleProjectChange}>
            {projects.map((project, index) => {
              return (
                <Option key={index} value={project._id}>
                  {project.title}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col>
          <div className="right">
            <Link to={`/projects/${match.params.pid}/executions`}>
              <Button type="primary" style={{ display: 'inline-block' }}>
                <Icon type="thunderbolt" />
                Executions
              </Button>
            </Link>
            <Link to={`/projects/${match.params.pid}/settings`}>
              <Button
                style={{ display: 'inline-block', margin: '0 24px 0 16px' }}
              >
                <Icon type="setting" />
                Settings
              </Button>
            </Link>
            <Divider
              type="vertical"
              style={{ fontSize: 24, margin: 0, display: 'inline-block' }}
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(ProjectHeader);
