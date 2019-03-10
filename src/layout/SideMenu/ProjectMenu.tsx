import { Icon, Menu } from 'antd';
import React from 'react';

const { SubMenu } = Menu;

const ProjectMenu: React.FunctionComponent<{}> = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item style={{ margin: 0 }} key="1">
        <Icon type="appstore" />
        <span>Overview</span>
      </Menu.Item>
      <Menu.Item style={{ margin: 0 }} key="2">
        <Icon type="file-text" />
        <span>Test cases</span>
      </Menu.Item>
      <Menu.Item style={{ margin: 0 }} key="3">
        <Icon type="retweet" />
        <span>Cycles</span>
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
        <Icon type="pie-chart" />
        <span>Reports</span>
      </Menu.Item>
    </Menu>
  );
};

export default ProjectMenu;
