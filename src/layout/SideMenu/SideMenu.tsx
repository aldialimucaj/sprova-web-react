import logo from '@/images/sprova.svg';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
const { Sider } = Layout;
import BaseMenu from './BaseMenu';
import ProjectMenu from './ProjectMenu';
import './SideMenu.scss';

interface Props {
  collapsed: boolean;
  handleCollapse: (collapsed: boolean) => void;
}

const SideMenu: React.FunctionComponent<Props> = ({
  collapsed,
  handleCollapse,
}) => {
  return (
    <Sider collapsible={true} collapsed={collapsed} onCollapse={handleCollapse}>
      <div className="logo" id="logo">
        <Link to="/projects">
          <img src={logo} alt="logo" />
          <h1>Sprova</h1>
        </Link>
      </div>
      <Switch>
        <Route path="/projects/new" component={BaseMenu} />
        <Route path="/projects/:id" component={ProjectMenu} />
        <Route component={BaseMenu} />
      </Switch>
    </Sider>
  );
};

export default SideMenu;
