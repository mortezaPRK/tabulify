import React, { useState } from 'react';
import { TableProps } from '../../types';
import { getUniqueId } from '../../utils';

// Table Component
const Table = <T,>({
  columns,
  dataSource,
  rowSelection,
  pagination,
  dataIndex,
  className,
  width,
  onRowClick,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(pagination?.current || 1);

  const pageSize = pagination?.pageSize || dataSource.length;

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pagination?.onChange?.(page);
  };

  // Paginate data
  const paginatedData = pagination
    ? dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : dataSource;

  return (
    <div className={className}>
      <div className="tabulify-container" style={{ width: width ?? '100%' }}>
        <table className="tabulify-table">
          <thead className="tabulify-head">
            <tr>
              {rowSelection && <th></th>}
              {columns.map((column) => (
                <th className="tabulify-cell" key={getUniqueId(column.key)}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="tabulify-body">
            {paginatedData.map((record, index) => (
              <tr
                key={getUniqueId(record[dataIndex])}
                onClick={() => onRowClick?.(record[dataIndex])}
                className={Boolean(onRowClick) ? 'has-hover' : ''}
              >
                {columns.map((column) => (
                  <td className="tabulify-cell" key={getUniqueId(column.key)}>
                    {column.render ? (
                      column.render(record[column.key], record, index)
                    ) : (
                      <>{`${record[column.key]}`}</>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="tabulify-pagination">
          {Array.from(
            { length: Math.ceil(pagination.total / pageSize) },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
