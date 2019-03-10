import { Layout } from 'antd';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../../images/sprova.svg';
const { Sider } = Layout;
import BaseMenu from './BaseMenu';
import ProjectMenu from './ProjectMenu';
import './SideMenu.scss';

const SideMenu: React.FunctionComponent<{}> = () => {
  return (
    <Sider
      trigger={null}
      collapsible={false}
      collapsed={true}
      style={{
        height: '100vh',
        left: 0,
        overflow: 'auto',
        position: 'fixed',
      }}
    >
      <div className="logo" id="logo">
        <Link to="/projects">
          <img src={logo} alt="logo" />
          <h1>Sprova</h1>
        </Link>
      </div>
      <Switch>
        <Route path="/projects/new" componetn={BaseMenu} />
        <Route path="/projects/:id" component={ProjectMenu} />
        <Route component={BaseMenu} />
      </Switch>
    </Sider>
  );
};

export default SideMenu;
