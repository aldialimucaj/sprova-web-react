import { getExecution } from '@/api/execution.api';
import Level from '@/components/Level';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFetcher } from '@/hooks/useFetcher';
import PageContent from '@/layout/PageContent';
import { parseQuery } from '@/utils';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Icon,
  List,
  Row,
  Statistic,
  Tabs,
  Tooltip,
} from 'antd';
import Chart from 'chart.js';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import './ExecutionDetails.scss';
import OverviewTab from './tabs/OverviewTab';
import TestCasesTab from './tabs/TestCasesTab';

const TabPane = Tabs.TabPane;

interface Params {
  pid: string;
  ecid: string;
}

const ExecutionResult: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  location,
}) => {
  const [{ project }] = useContext(ProjectContext);

  const [activeTabKey, setActiveTabKey] = useState('overview');

  const { data: execution, error, isLoading } = useFetcher(
    getExecution,
    match.params.ecid
  );

  const generatePdfButton = (
    <Tooltip title="Generate PDF Report" key="generatePdf">
      <Button style={{ marginRight: 16 }}>
        <Icon type="file-pdf" />
      </Button>
    </Tooltip>
  );

  const rerunButton = (
    <Link to="/" key="rerun">
      <Button type="primary">Re-run Tests</Button>
    </Link>
  );

  let content;

  switch (activeTabKey) {
    case 'overview': {
      content = <OverviewTab />;
      break;
    }
    case 'testCases': {
      content = <TestCasesTab />;
      break;
    }
  }

  return (
    <PageContent
      header={
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <Link to={`/projects/${match.params.pid}`}>
                <Breadcrumb.Item>{project!.title}</Breadcrumb.Item>
              </Link>
              <Link to={`/projects/${match.params.pid}/executions`}>
                <Breadcrumb.Item>Executions</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item>Result</Breadcrumb.Item>
            </Breadcrumb>
          }
          title="Finished Execution"
          extra={[generatePdfButton, rerunButton]}
          tabs={
            <Tabs
              defaultActiveKey={`${activeTabKey}`}
              onChange={(activeKey: string) => setActiveTabKey(activeKey)}
            >
              <TabPane tab="Overview" key="overview" />
              <TabPane tab="Test Cases" key="testCases" />
            </Tabs>
          }
        >
          <span>Execution Details</span>
        </PageHeader>
      }
    >
      {content}
    </PageContent>
  );
};

export default ExecutionResult;
