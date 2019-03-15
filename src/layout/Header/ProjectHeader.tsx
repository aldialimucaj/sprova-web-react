import { Button, Col, Divider, Icon, Row, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Project } from '../../models/Project';
const { Option } = Select;


interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  projects: Project[];
}

const ProjectHeader: React.FunctionComponent<Props> = ({ match, projects, history }) => {

  let selectedProjectIndex = projects.findIndex((p) => p._id === match.params.id);
  const [project, setProject] = useState((projects[selectedProjectIndex]));
  console.log(selectedProjectIndex)

  function handleChange(index: string) {
    if (index !== 'new') {
      history.push(`/projects/${projects[parseInt(index)]._id}`);
    }
  }

  return (
    <React.Fragment>
      <Row type="flex" justify="space-between">
        <Col>
          <Select style={{ width: 120 }} onChange={handleChange}>
            {projects.map((project, index) => (
              <Option key={index}>
                {project.title}
              </Option>
            ))}
            <Option value="new">
              <Link to="/new">Create new</Link>
            </Option>
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
    </React.Fragment>
  );
};

export default withRouter(ProjectHeader);
