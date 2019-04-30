import React from 'react';
import './Menu.scss';

interface ItemProps {
  icon?: React.ReactNode;
}

export const Item: React.FunctionComponent<ItemProps> = ({
  children,
  icon,
}) => {
  return (
    <li className="sprova-menu-item">
      {icon && <span className="sprova-menu-item-icon">{icon}</span>}
      {children}
    </li>
  );
};

interface SectionProps {
  title?: string;
}

export const Section: React.FunctionComponent<SectionProps> = ({
  children,
  title,
}) => {
  return (
    <div className="sprova-menu-section">
      {title && <div className="sprova-menu-section-title">{title}</div>}
      <ul className="sprova-menu-section-list">{children}</ul>
    </div>
  );
};

interface MenuProps {}

const Menu: React.FunctionComponent<MenuProps> = ({ children }) => {
  return <div className="sprova-menu">{children}</div>;
};

export default Menu;
