import classnames from 'classnames';
import React from 'react';
import Card from '../Card';
import './CardList.scss';

interface Props {
  actions?: React.ReactNode;
  data: any[];
  empty?: React.ReactNode;
  onItemClick?: (item: any) => void;
  renderItem: (item: any, index: number) => React.ReactNode;
  small?: boolean;
  style?: any;
  title?: React.ReactNode;
  zebra?: boolean;
}

const CardList: React.FunctionComponent<Props> = ({
  actions,
  data,
  empty,
  onItemClick,
  renderItem,
  small = false,
  style,
  title,
  zebra = false,
}) => {
  return (
    <Card title={title} padded={false} actions={actions} style={{ ...style }}>
      {data.length > 0 ? (
        <ul className={classnames('sprova-card-list')}>
          {data.map((item: any, index: number) => (
            <li
              key={index}
              className={classnames(
                'sprova-card-list-item',
                { 'is-small': small },
                { 'is-clickable': onItemClick },
                { 'is-zebra': zebra }
              )}
              onClick={() => onItemClick && onItemClick(item)}
              style={{ width: '100%' }}
            >
              {renderItem(item, index)}
            </li>
          ))}
        </ul>
      ) : (
        <div className={classnames('sprova-card-list-empty')}>
          {empty || (
            <span className={classnames('sprova-card-list-empty-item')}>
              No data.
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

export default CardList;
