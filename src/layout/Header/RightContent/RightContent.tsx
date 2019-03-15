import { Avatar, Badge, Dropdown, Icon, Menu } from 'antd';
import React, { Fragment } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getUsername, logout } from '../../../api/auth.api';
import './RightContent.scss';

const RightContent: React.FunctionComponent<RouteComponentProps> = ({
  history,
}) => {
  const username = getUsername();

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

  return (
    <Fragment>
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
            {username.slice(0, 1).toUpperCase()}
          </Avatar>
          {username}
        </div>
      </Dropdown>
    </Fragment>
  );
};

export default withRouter(RightContent);
