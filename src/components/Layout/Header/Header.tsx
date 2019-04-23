import logo from '@/images/sprova.svg';
import React, { useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './Header.scss';
import { Dropdown, Menu, Icon, Badge, Avatar } from 'antd';
import { getUser, logout } from '@/api/auth.api';

const Header: React.FunctionComponent<RouteComponentProps> = ({
  children,
  history,
}) => {
  const doLogout = () => {
    logout();
    history.push('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <a>
          <Icon type="user" style={{ marginRight: 8 }} /> Account Settings
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a onClick={doLogout}>
          <Icon type="logout" style={{ marginRight: 8 }} /> Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const notificationMenu = (
    <Menu>
      <Menu.Item>Not implemented yet</Menu.Item>
    </Menu>
  );

  const user = getUser();

  return (
    <div className="sprova-layout-header">
      <div className="sprova-layout-header-left">
        <div className="logo" id="logo">
          <Link to="/projects">
            <img src={logo} alt="logo" />
            <h1>Sprova</h1>
          </Link>
        </div>
        <div className="navbar-item">
          <span>Projects</span>
        </div>
      </div>

      <div className="sprova-layout-header-right">
        <Dropdown
          overlay={notificationMenu}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="navbar-item">
            <span>
              <Badge
                count={11}
                style={{ backgroundColor: '#1890ff', boxShadow: 'none' }}
              >
                <Icon
                  type="bell"
                  style={{ fontSize: 16, padding: 4, verticalAlign: 'middle' }}
                />
              </Badge>
            </span>
          </div>
        </Dropdown>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className="navbar-item">
            <Avatar size="small" className="avatar">
              A
            </Avatar>
            {user!.username}
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default withRouter(Header);
