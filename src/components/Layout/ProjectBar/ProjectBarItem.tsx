import { Tooltip } from 'antd';
import cx from 'classnames';
import React from 'react';
import './ProjectBarItem.scss';

interface Props {
  onClick?: () => void;
  selected?: boolean;
  tooltip?: string;
}

const ProjectBarItem: React.FunctionComponent<Props> = ({
  children,
  onClick,
  selected = false,
  tooltip,
}) => {
  return (
    <Tooltip placement="right" title={tooltip}>
      <div
        className={cx('sprova-projectbar-item', {
          'is-selected': selected,
        })}
        onClick={onClick}
      >
        {children}
      </div>
    </Tooltip>
  );
};

export default ProjectBarItem;
