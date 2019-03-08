import { Icon, Layout, Menu } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/sprova.svg';
const { Sider } = Layout;
import LayoutContext from '../../../contexts/LayoutContext';
const { SubMenu } = Menu;
import './SideMenu.scss';

interface Props {
  collapsed: boolean;
}

const SideMenu: React.FunctionComponent<Props> = ({ collapsed }) => {
  const { type: layoutType } = useContext(LayoutContext);

  const menu =
    layoutType === 'Overview' ? null : (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Icon type="appstore" />
          <span>Overview</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="file-text" />
          <span>Test cases</span>
        </Menu.Item>
        <Menu.Item key="3">
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
        <Menu.Item key="5">
          <Icon type="pie-chart" />
          <span>Reports</span>
        </Menu.Item>
      </Menu>
    );

  return (
    <Sider trigger={null} collapsible={true} collapsed={collapsed}>
      <div className="logo" id="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
          <h1>Sprova</h1>
        </Link>
      </div>
      {menu}
    </Sider>
  );
};

export default SideMenu;
