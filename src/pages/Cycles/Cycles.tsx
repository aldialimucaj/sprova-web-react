import { List } from 'antd';
import React, { Fragment, useContext } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader';
import { ProjectContext } from '../../contexts/ProjectContext';
import { Cycle } from '../../models/Cycle';

interface Params {
  id: string;
}

const Cycles: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const [] = useContext(ProjectContext);
  return (
    <Fragment>
      <SectionHeader
        title="Cycles"
        extra={
          <Link to={`/projects/${match.params.id}/cycles/new`}>New Cycle</Link>
        }
      />
      <List
        itemLayout="horizontal"
        dataSource={null}
        renderItem={(cycle: Cycle) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{cycle.title}</a>}
              description={cycle.description}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};

export default Cycles;
