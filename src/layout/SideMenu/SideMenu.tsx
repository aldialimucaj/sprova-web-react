import { Layout } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/sprova.svg';
const { Sider } = Layout;
import LayoutContext from '../../contexts/LayoutContext';
import BaseMenu from './Base/Menu';
import ProjectMenu from './Project/Menu';
import './SideMenu.scss';

interface Props {
  collapsed: boolean;
}

const SideMenu: React.FunctionComponent<Props> = ({ collapsed }) => {
  const { type: layoutType } = useContext(LayoutContext);

  const menu = layoutType === 'Base' ? <BaseMenu /> : <ProjectMenu />;
  

  return (
    <Sider trigger={null} collapsible={true} collapsed={collapsed}>
      <div className="logo" id="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
          <h1>Sprova</h1>
        </Link>
      </div>
      {menu}
    </Sider>
  );
};

export default SideMenu;
