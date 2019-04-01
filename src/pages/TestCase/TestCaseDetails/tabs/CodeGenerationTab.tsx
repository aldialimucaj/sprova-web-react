import { TestCase } from '@/models/TestCase';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';
import React from 'react';
import CodeDetails from './CodeDetails';

interface Params {
  pid: string;
  tid: string;
}

interface Props extends RouteComponentProps<Params> {
  testCase: TestCase;
}

const OverviewTab: React.FunctionComponent<Props> = ({
  history,
  match,
  testCase,
}) => {

  return (
    <Tabs defaultActiveKey="1" type="line" tabPosition="right">
      <TabPane tab="Java" key="1">
        <CodeDetails lang="java" testCaseId={testCase._id} />
      </TabPane>
      <TabPane tab="Kotlin" key="2">
        Kotlin
        </TabPane>
      <TabPane tab="Kotlin" key="3">
        JavaScript (protractor)
        </TabPane>
      <TabPane tab="Kotlin" key="4">
        JavaScript (generic)
        </TabPane>
      <TabPane tab="Kotlin" key="5">
        Python
        </TabPane>
    </Tabs>
  );
};

export default withRouter(OverviewTab);
