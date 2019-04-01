import { TestCase } from '@/models/TestCase';
import { findChildren } from '@/utils';
import { List, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';
import ExecutionsTab from './ExecutionsTab';

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
    <Fragment>
      <Tabs defaultActiveKey="1" type="line" tabPosition="right">
        <TabPane tab="Java" key="1">
          Java
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
    </Fragment>
  );
};

export default withRouter(OverviewTab);
