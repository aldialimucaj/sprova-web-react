import cx from 'classnames';
import React, { useState } from 'react';
import './Sider.scss';
import logo from '@/images/sprova.svg';
import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

const Sider: React.FunctionComponent = ({ children }) => {
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
    <div className="sprova-sider">
      <div className="sprova-sider-menu">
        <img src={logo} alt="logo" />
        <h3 style={{ display: 'inline-block', marginLeft: 16 }}>Sports App</h3>

        <div className="sprova-sider-menu-section">Cycle</div>
        <Dropdown overlay={menu} trigger={['click']}>
          <h3>
            Release 7.4 <Icon type="down" />
          </h3>
        </Dropdown>

        <div className="sprova-sider-menu-section">Menu</div>
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

        <div className="sprova-sider-menu-section">More</div>
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
      <div className="sprova-sider-footer">
        <ul className="sprova-sider-footer-menu">
          <li>
            <Link to="/">
              <Icon type="swap" style={{ marginRight: 8 }} />
              Change Project
            </Link>
          </li>
          <li>
            <Link to="/">
              <Icon type="logout" style={{ marginRight: 8 }} />
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sider;
