import CardList from '@/components/CardList';
import SectionHeader from '@/components/SectionHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Cycle } from '@/models/Cycle';
import { TestCase } from '@/models/TestCase';
import { Col, Row } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

const ProjectDetails: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const [{ cycles, project, testCases }] = useContext(ProjectContext);

  return (
    <Fragment>
      <SectionHeader title="Overview" />
      <Row gutter={16}>
        <Col lg={12} style={{ marginBottom: 16 }}>
          <CardList
            title="Cycles"
            dataSource={cycles.slice(0, 4)}
            extra={<Link to={`/projects/${project._id}/cycles`}>Show all</Link>}
            onItemClick={({ _id }: Cycle) =>
              history.push(`/projects/${project._id}/cylces/${_id}`)
            }
            renderItem={(cycle: Cycle) => <div>{cycle.title}</div>}
          />
        </Col>
        <Col lg={12} style={{ marginBottom: 16 }}>
          <CardList
            title="Test Cases"
            dataSource={testCases.slice(0, 4)}
            extra={
              <Link to={`/projects/${project._id}/testcases`}>Show all</Link>
            }
            onItemClick={({ _id }: TestCase) =>
              history.push(`/projects/${project._id}/testcases/${_id}`)
            }
            renderItem={(testCase: TestCase) => <div>{testCase.title}</div>}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectDetails;
