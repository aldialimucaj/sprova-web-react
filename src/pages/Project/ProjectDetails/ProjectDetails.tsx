import Card, { CardBody } from '@/components/Card';
import { PageContent, PageHeader } from '@/components/Layout';
import Level from '@/components/Level';
import { CycleContext } from '@/contexts/CycleContext';
import { ProjectContext } from '@/contexts/ProjectContext';
import { Cycle } from '@/models/Cycle';
import { Button, Col, Divider, Icon, Row, Spin, Tag } from 'antd';
import React, { Fragment, useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Params {
  pid: string;
}

const ProjectDetails: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  history,
}) => {
  const { currentProject } = useContext(ProjectContext);
  const { currentCycle, cycles } = useContext(CycleContext);

  return (
    <Fragment>
      <PageHeader
        title={currentProject!.title}
        subTitle={(currentCycle && currentCycle.title) || 'Overview'}
      />
      <PageContent>
        <Level align="bottom">
          <div>
            <h3 style={{ display: 'inline-block', marginRight: 8 }}>Cycles</h3>
            <Icon style={{ cursor: 'pointer' }} type="info-circle" />
          </div>
          <Button type="primary">New</Button>
        </Level>
        <Divider />
        <Row gutter={24} style={{ marginBottom: 24 }}>
          {cycles.map((cycle: Cycle) => (
            <Col span={8} key={cycle._id} style={{ marginBottom: 24 }}>
              <Card
                status="success"
                onClick={() =>
                  history.push(
                    `/projects/${match.params.pid}/cycles/${cycle._id}`
                  )
                }
              >
                <CardBody>
                  <h3>{cycle.title}</h3>
                  <p style={{ marginTop: 8, marginBottom: 16 }}>
                    {cycle.description || 'No description.'}
                  </p>
                  <Tag>Released</Tag>
                  <Tag>Dev</Tag>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </PageContent>
    </Fragment>
  );
};

export default withRouter(ProjectDetails);
