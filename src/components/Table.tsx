import React, { useState } from 'react';
import { TableProps } from './Table.types';
import { getUniqueId } from './utils';

// Table Component
const Table = <T,>({
  columns,
  dataSource,
  rowSelection,
  pagination,
  key,
  className,
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
    <>
      <table className={className}>
        <thead className="tabulify-head">
          <tr>
            {rowSelection && <th></th>}
            {columns.map((column) => (
              <th key={getUniqueId(column.key)}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="tabulify-body">
          {paginatedData.map((record, index) => (
            <tr
              key={getUniqueId(record[key])}
              onClick={() => onRowClick?.(record[key])}
            >
              {columns.map((column) => (
                <td key={getUniqueId(column.key)}>
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
    </>
  );
};

export default Table;
