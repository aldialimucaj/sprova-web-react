import { Card, Empty } from 'antd';
import React from 'react';
import './CardList.scss';

interface Props {
  dataSource: any[];
  extra?: React.ReactNode;
  renderEmpty?: JSX.Element;
  renderItem: (item: any) => JSX.Element;
  onItemClick?: (record: any) => void;
  title: string;
}

const CardList: React.FunctionComponent<Props> = ({
  dataSource,
  extra,
  renderEmpty,
  renderItem,
  onItemClick,
  title,
}) => {
  return (
    <Card title={title} extra={extra}>
      {dataSource && dataSource.length > 0
        ? dataSource.map((item: any, index: number) => (
            <Card.Grid
              key={index}
              className={`card-list-item ${onItemClick ? 'clickable' : ''}`}
            >
              <div
                style={{ padding: 24 }}
                onClick={onItemClick && (() => onItemClick(item))}
              >
                {renderItem(item)}
              </div>
            </Card.Grid>
          ))
        : renderEmpty || <Empty />}
    </Card>
  );
};

export default CardList;
