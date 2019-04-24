import logo from '@/images/sprova.svg';
import { Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.scss';

const SideMenu: React.FunctionComponent = ({ children }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
  return (
    <div className="sprova-sidemenu">
      <div className="sprova-sidemenu-title">
        <img id="sprova-logo" src={logo} alt="logo" />
        <h3 id="sprova-project-title">Sports App</h3>
      </div>

      <div className="sprova-sidemenu-menu">
        <div className="sprova-sidemenu-menu-section">Cycle</div>
        <div className="sprova-sidemenu-cycle-select">
          <Dropdown overlay={menu} trigger={['click']}>
            <h3>
              Release 7.4 <Icon type="down" />
            </h3>
          </Dropdown>
        </div>

        <div className="sprova-sidemenu-menu-section">Menu</div>
        <ul>
          <Link to="/">
            <li>
              <Icon type="thunderbolt" style={{ marginRight: 8 }} /> Executions
            </li>
          </Link>
          <Link to="/">
            <li>
              <Icon type="file-text" style={{ marginRight: 8 }} /> Test Cases
            </li>
          </Link>
          <Link to="/">
            <li>
              <Icon type="folder" style={{ marginRight: 8 }} /> Test Sets
            </li>
          </Link>
        </ul>

        <div className="sprova-sidemenu-menu-section">More</div>
        <ul>
          <Link to="/">
            <li>
              <Icon type="bell" style={{ marginRight: 8 }} /> Notifications
            </li>
          </Link>
          <Link to="/">
            <li>
              <Icon type="user" style={{ marginRight: 8 }} /> Account
            </li>
          </Link>
          <Link to="/">
            <li>
              <Icon type="setting" style={{ marginRight: 8 }} /> Settings
            </li>
          </Link>
        </ul>
      </div>

      <div className="sprova-sidemenu-footer">
        <ul>
          <Link to="/">
            <li>
              <Icon type="logout" style={{ marginRight: 8 }} /> Sign out
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
