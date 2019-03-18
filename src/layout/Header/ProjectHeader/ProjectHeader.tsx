import { Button, Col, Divider, Icon, Row, Select } from 'antd';
import { Project } from 'models/Project';
import React, { Fragment, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './ProjectHeader.scss';

const { Option } = Select;

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  projects: Project[];
}

const ProjectHeader: React.FunctionComponent<Props> = ({
  match,
  projects,
  history,
}) => {
  const [id, setId] = useState(match.params.id);

  const handleChange = (projectId: string) => {
    if (id !== projectId) {
      setId(projectId);
      history.push(`/projects/${projectId}`);
    }
  };

  return (
    <Fragment>
      <Row type="flex" justify="space-between">
        <Col>
          <Select value={id} onChange={handleChange}>
            {projects.map((project, index) => (
              <Option key={index} value={project._id}>
                {project.title}
              </Option>
            ))}
          </Select>
        </Col>
        <Col>
          <div className="right">
            <Button type="primary" style={{ display: 'inline-block' }}>
              <Icon type="play-circle" />
              Execute
            </Button>
            <Link to={`/projects/${match.params.id}/settings`}>
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
