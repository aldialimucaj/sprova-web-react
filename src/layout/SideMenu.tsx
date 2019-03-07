import { Icon, Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/sprova.svg';
import './Header.scss';
const { Sider } = Layout;
const { SubMenu } = Menu;
import './SideMenu.scss';

interface Props {
  collapsed: boolean;
}

const SideMenu: React.FunctionComponent<Props> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible={true} collapsed={collapsed}>
      <div className="logo" id="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
          <h1>Sprova</h1>
        </Link>
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span>Test cases</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="desktop" />
          <span>Cycles</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              <span>Executions</span>
            </span>
          }
        >
          <Menu.Item key="3">dummy</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="team" />
              <span>Test sets</span>
            </span>
          }
        >
          <Menu.Item key="8">dummy</Menu.Item>
        </SubMenu>
        <Menu.Item key="9">
          <Icon type="file" />
          <span>Reports</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu;
