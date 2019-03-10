import { Icon, Menu } from 'antd';
import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

const { SubMenu } = Menu;

interface Params {
  id: string;
}

const ProjectMenu: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item style={{ margin: 0 }} key="1">
        <Link to={`/projects/${match.params.id}`}>
          <Icon type="appstore" />
          <span>Overview</span>
        </Link>
      </Menu.Item>
      <Menu.Item style={{ margin: 0 }} key="2">
        <Link to={`/projects/${match.params.id}/testcases`}>
          <Icon type="file-text" />
          <span>Test cases</span>
        </Link>
      </Menu.Item>
      <Menu.Item style={{ margin: 0 }} key="3">
        <Link to={`/projects/${match.params.id}/cycles`}>
          <Icon type="retweet" />
          <span>Cycles</span>
        </Link>
      </Menu.Item>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="snippets" />
            <span>Test sets</span>
          </span>
        }
      >
        <Menu.Item key="4">dummy</Menu.Item>
      </SubMenu>
      <Menu.Item style={{ margin: 0 }} key="5">
        <Link to={`/projects/${match.params.id}/reports`}>
          <Icon type="pie-chart" />
          <span>Reports</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter(ProjectMenu);
