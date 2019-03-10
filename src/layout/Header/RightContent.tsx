import { Avatar, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import authApi from '../../api/auth.api';
import './RightContent.scss';

const RightContent: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const username = authApi.getUsername();

  const logout = () => {
    authApi.logout();
    history.push('/login');
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
    <Dropdown overlay={menu} placement="bottomRight">
      <div className="navbar-item">
        <Avatar size="small" className="avatar">
          {username.slice(0, 1).toUpperCase()}
        </Avatar>
        {username}
      </div>
    </Dropdown>
  );
};

export default withRouter(RightContent);
