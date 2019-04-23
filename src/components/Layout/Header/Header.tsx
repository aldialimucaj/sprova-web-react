import { getUser, logout } from '@/api/auth.api';
import logo from '@/images/sprova.svg';
import { Avatar, Badge, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './Header.scss';

const Header: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
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
    <div className="sprova-header">
      <div className="sprova-header-left">
        <span className="logo" id="logo">
          <Link to="/projects">
            <img src={logo} alt="logo" />
            <h1>Sprova</h1>
          </Link>
        </span>

        <Link to="/projects">
          <span className="sprova-header-item">Projects</span>
        </Link>
      </div>

      <div className="sprova-header-right">
        <Dropdown
          overlay={notificationMenu}
          placement="bottomRight"
          className="sprova-header-item"
          trigger={['click']}
        >
          <span>
            <Badge
              count={5}
              style={{
                backgroundColor: '#1890ff',
                boxShadow: 'none',
              }}
            >
              <Icon
                type="bell"
                style={{ fontSize: 16, padding: 4, verticalAlign: 'middle' }}
              />
            </Badge>
          </span>
        </Dropdown>

        <Dropdown
          overlay={userMenu}
          placement="bottomRight"
          className="sprova-header-item"
        >
          <span>
            <Avatar size="small" className="avatar">
              A
            </Avatar>
            {user!.username}
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default withRouter(Header);
