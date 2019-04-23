import cx from 'classnames';
import React, { useState } from 'react';
import './Sider.scss';
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
      <div className="sprova-sider-top">
        <h3>Sports App</h3>
        <Dropdown overlay={menu} trigger={['click']}>
          <h3>
            Release 7.4 <Icon type="down" />
          </h3>
        </Dropdown>
      </div>
      <div className="sprova-sider-menu">
        <h3>Menu</h3>
        <ul>
          <li>Test Cases</li>
        </ul>
      </div>
      <div className="sprova-sider-bottom">
        <ul className="menu">
          <li>
            <Link to="/">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sider;
