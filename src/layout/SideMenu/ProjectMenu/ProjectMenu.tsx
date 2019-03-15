import { Icon, Menu } from 'antd';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Params {
  id: string;
}

interface MenuItem {
  exact?: boolean;
  icon: string;
  text: string;
  path: string;
}

const ProjectMenu: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  location,
}) => {
  const menuItems: MenuItem[] = [
    {
      exact: true,
      icon: 'appstore',
      path: '',
      text: 'Overview',
    },
    {
      icon: 'file-text',
      path: 'testcases',
      text: 'Test Cases',
    },
    {
      icon: 'retweet',
      path: 'cycles',
      text: 'Cycles',
    },
    {
      icon: 'snippets',
      path: 'testsets',
      text: 'Test Sets',
    },
    {
      icon: 'pie-chart',
      path: 'reports',
      text: 'Reports',
    },
  ];

  const normalizedPath = location.pathname.replace(
    `/projects/${match.params.id}`,
    ''
  );

  const isActive = (menuItem: MenuItem): boolean => {
    if (menuItem.exact) {
      return normalizedPath === menuItem.path;
    }
    return normalizedPath.split('/').includes(menuItem.path);
  };

  return (
    <Menu theme="dark" mode="vertical" selectedKeys={[]}>
      {menuItems.map((menuItem, index) => (
        <Menu.Item
          style={{ margin: 0 }}
          key={index}
          className={`${isActive(menuItem) ? 'ant-menu-item-selected' : ''}`}
        >
          <Link
            to={`/projects/${match.params.id}${
              menuItem.path.length > 0 ? '/' : ''
            }${menuItem.path}`}
          >
            <Icon type={menuItem.icon} />
            <span>{menuItem.text}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default withRouter(ProjectMenu);
