import React from 'react';
import { cx, getUniqueId } from '../../utils';
import { TableBodyProps } from '../../types';
import IconBrandDatabricks from '../Icons/IconBrandDatabricks';

export const TableBody = <T,>({
  paginatedData,
  dataIndex,
  columns,
  loading,
  onRowClick,
}: TableBodyProps<T>) => {
  if (loading)
    return (
      <tr className="min-height">
        <td colSpan={columns?.length ?? 1}>
          <div className="tabulify-loader-wrapper" data-testid="fetching-data">
            <div className="tabulify-loader" />
          </div>
        </td>
      </tr>
    );

  if (!paginatedData || paginatedData.length < 1)
    return (
      <tr className="min-height">
        <td colSpan={columns?.length ?? 1}>
          <div className="tabulify-no-data" data-testid="no-data">
            <IconBrandDatabricks />
            <div>No Data</div>
          </div>
        </td>
      </tr>
    );

  return paginatedData.map((record, index) => (
    <tr
      key={getUniqueId(record[dataIndex])}
      className={cx([Boolean(onRowClick) && 'has-hover'])}
      data-id={String(record[dataIndex])}
      onClick={() => onRowClick?.(record[dataIndex])}
    >
      {columns.map((column) => (
        <td className="tabulify-cell" key={getUniqueId(column.key)}>
          {column.render ? (
            column.render(record[column.key], record, index)
          ) : (
            <>{`${record[column.key] !== undefined || record[column.key] !== null ? record[column.key] : ''}`}</>
          )}
        </td>
      ))}
    </tr>
  ));
};
