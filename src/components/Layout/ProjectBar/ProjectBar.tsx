import { Icon } from 'antd';
import React from 'react';
import './ProjectBar.scss';

const ProjectBar: React.FunctionComponent = () => {
  return (
    <div className="sprova-projectbar">
      <div className="sprova-projectbar-item">R</div>
      <div className="sprova-projectbar-item">S</div>
      <div className="sprova-projectbar-add">
        <Icon type="plus" />
      </div>
    </div>
  );
};

export default ProjectBar;
