import React from 'react';
import './Content.scss';

const Content: React.FunctionComponent = ({ children }) => {
  return <div className="sprova-layout-content">{children}</div>;
};

export default Content;
