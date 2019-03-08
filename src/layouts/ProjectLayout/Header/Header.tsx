import { Avatar, Divider, Dropdown, Icon, Layout, Menu, Select } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
const { Header } = Layout;
import authApi from '../../../api/auth.api';
import UserContext from '../../../contexts/UserContext';
import './Header.scss';

const { Option } = Select;

interface Props {
  sidebarCollapsed: boolean;
  toggleSidebar(): void;
}

const HeaderWrapper: React.FunctionComponent<Props> = ({
  sidebarCollapsed,
  toggleSidebar,
}) => {
  const { isAuthenticated, setIsAuthenticated, username } = useContext(
    UserContext
  );

  const logout = () => {
    authApi.logout();
    setIsAuthenticated(false);
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

  return (
    <Header tagName="header" style={{ padding: 0 }}>
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
              <Avatar size="small" className="avatar">
                {username.slice(0, 1).toUpperCase()}
              </Avatar>
              {username}
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderWrapper;
