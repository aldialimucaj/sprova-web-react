import { Divider, Dropdown, Icon, Layout, Menu, Select } from 'antd';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
const { Header: AntdHeader } = Layout;
import authApi from '../api/auth.api';
import './Header.scss';

const { Option } = Select;

interface Props {
  sidebarCollapsed: boolean;
  toggleSidebar(): void;
}

const Header: React.FunctionComponent<Props> = ({
  sidebarCollapsed,
  toggleSidebar,
}) => {
  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    authApi.logout();
    setLoggedOut(true);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a>
          <Icon type="user" style={{ marginRight: 8 }} /> Account Settings
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a onClick={logout}>
          <Icon type="logout" style={{ marginRight: 8 }} /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return loggedOut ? (
    <Redirect to="/login" />
  ) : (
    <AntdHeader tagName="header" style={{ padding: 0 }}>
      <div className="navbar">
        <span className="trigger" onClick={toggleSidebar}>
          <Icon type={sidebarCollapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>
        <Divider type="vertical" style={{ fontSize: 24, margin: 0 }} />
        <Select defaultValue="" style={{ width: 120, margin: '0 24px' }}>
          <Option value="">Create new</Option>
          <Option value="">My Project</Option>
        </Select>
        <div className="right">
          <Dropdown overlay={menu} placement="bottomRight">
            <div className="navbar-item">
              <Link to="/user">
                User <Icon type="down" />
              </Link>
            </div>
          </Dropdown>
        </div>
      </div>
    </AntdHeader>
  );
};

export default Header;
