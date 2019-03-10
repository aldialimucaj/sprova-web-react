import { Layout } from 'antd';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../../images/sprova.svg';
const { Sider } = Layout;
import BaseMenu from './Base/Menu';
import ProjectMenu from './Project/Menu';
import './SideMenu.scss';

interface Props {
  collapsed: boolean;
}

const SideMenu: React.FunctionComponent<Props> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible={true} collapsed={collapsed}>
      <div className="logo" id="logo">
        <Link to="/projects">
          <img src={logo} alt="logo" />
          <h1>Sprova</h1>
        </Link>
      </div>
      <Switch>
        <Route path="/projects/:id" component={ProjectMenu} />
        <Route component={BaseMenu} />
      </Switch>
    </Sider>
  );
};

export default SideMenu;
