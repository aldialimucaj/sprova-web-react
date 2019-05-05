import classnames from 'classnames';
import React from 'react';
import './Table.scss';

interface Props {
  actions?: React.ReactNode[];
  columnTitles: string[];
  data: any[];
  empty?: React.ReactNode;
  extras?: React.ReactNode;
  onRowClick?: (item: any) => void;
  renderRow: (item: any, index: number) => React.ReactNode[];
  style?: any;
  title?: string;
}

const Table: React.FunctionComponent<Props> = ({
  columnTitles,
  data,
  empty,
  extras,
  onRowClick,
  renderRow,
  style,
}) => {
  return (
    <table className="sprova-table" style={{ ...style }}>
      {extras && <div className="sprova-table-extras">{extras}</div>}
      <thead className="sprova-table-head">
        <tr className="sprova-table-row">
          {columnTitles.map((column: string, index: number) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      {data.length > 0 ? (
        <tbody className="sprova-table-body">
          {data.map((item: any, index: number) => (
            <tr
              key={index}
              className={classnames('sprova-table-row', {
                'is-clickable': onRowClick,
              })}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      ) : (
        <div className={classnames('sprova-table-empty')}>
          {empty || (
            <span className={classnames('sprova-table-empty-item')}>
              No data.
            </span>
          )}
        </div>
      )}
    </table>
  );
};

export default Table;
