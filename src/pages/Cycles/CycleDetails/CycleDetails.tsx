import PageHeader from '@/components/PageHeader';
import PageContent from '@/layout/PageContent';
import React, { useContext } from 'react';
import { Breadcrumb } from 'antd';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ProjectContext } from '@/contexts/ProjectContext';

interface Params {
  pid: string;
  cid: string;
}

const CycleDetails: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  history,
}) => {
  const { currentProject } = useContext(ProjectContext);

  return (
    <PageContent
      header={
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <Link to={`/projects/${match.params.pid}`}>
                <Breadcrumb.Item>{currentProject!.title}</Breadcrumb.Item>
              </Link>
              <Link to={`/projects/${match.params.pid}/testcases`}>
                <Breadcrumb.Item>Test Cases</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item>Test Case</Breadcrumb.Item>
            </Breadcrumb>
          }
          title="Cycle"
        />
      }
    >
      CycleDetails
    </PageContent>
  );
};

export default CycleDetails;
