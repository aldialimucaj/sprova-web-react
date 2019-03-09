import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Dropdown, Icon, Layout, Menu, Select } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import authApi from '../../api/auth.api';
import { Project } from "../../models/Project";
import { getProjects } from "../../api/project.api";
import './Header.scss';

const { Header } = Layout;
const { Option } = Select;

interface Props extends RouteComponentProps {
  sidebarCollapsed: boolean;
  toggleSidebar(): void;
}

const HeaderWrapper: React.FunctionComponent<Props> = ({
  history,
  sidebarCollapsed,
  toggleSidebar,
}) => {
  const username = authApi.getUsername();

  const logout = () => {
    authApi.logout();
    history.push('/login');
  };

  const [projects, setProjects] = useState(new Array());
  const fetchData = async () => {
    try {
      const data = await getProjects(5);
      const children = [];
      for (let i = 0; i < data.length; i++) {
        children.push(
          <Option key={i}>
            <Link to={"/projects/" + data[i]._id}>
              {data[i].title}
            </Link>
          </Option>
        );
      }
      setProjects(children);
    } catch (e) {
      // TODO: take care of no data error
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


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
        <Select defaultValue="0" style={{ width: 120, margin: '0 24px' }}>
          {projects}
          <Option value="new">
            <Link to="/new">Create new</Link>
          </Option>
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

export default withRouter(HeaderWrapper);
