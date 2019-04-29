import classnames from 'classnames';
import React from 'react';
import Card from '../Card';
import './CardTable.scss';

const classify = (Component: typeof React.Component, className: string) => {
  return <Component className={className} />;
};

interface Props {
  actions?: React.ReactNode;
  columnTitles: string[];
  data: any[];
  empty?: React.ReactNode;
  onRowClick?: (item: any) => void;
  renderRow: (item: any, index: number) => React.ReactNode[];
  style?: any;
  title?: string;
}

const CardTable: React.FunctionComponent<Props> = ({
  actions,
  columnTitles,
  data,
  empty,
  onRowClick,
  renderRow,
  style,
  title,
}) => {
  return (
    <Card title={title} padded={false} actions={actions} style={{ ...style }}>
      <table className="sprova-card-table">
        <thead className="sprova-card-table-head">
          <tr className="sprova-card-table-row">
            {columnTitles.map((column: string, index: number) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        {data.length > 0 ? (
          <tbody className="sprova-card-table-body">
            {data.map((item: any, index: number) => (
              <tr
                key={index}
                className={classnames('sprova-card-table-row', {
                  'is-clickable': onRowClick,
                })}
                onClick={() => onRowClick && onRowClick(item)}
              >
                {renderRow(item, index)}
              </tr>
            ))}
          </tbody>
        ) : (
          <div className={classnames('sprova-card-table-empty')}>
            {empty || (
              <span className={classnames('sprova-card-table-empty-item')}>
                No data.
              </span>
            )}
          </div>
        )}
      </table>
    </Card>
  );
};

export default CardTable;
