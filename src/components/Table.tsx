import React, { useState } from 'react';
import { TableProps } from './types';

// Table Component
const Table = <T extends { key: React.Key }>({
  columns,
  dataSource,
  rowSelection,
  pagination,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(pagination?.current || 1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<(keyof T)[]>(
    rowSelection?.selectedRowKeys || []
  );

  const pageSize = pagination?.pageSize || dataSource.length;

  // Handle row selection
  const handleRowSelection = (key: keyof T, record: T) => {
    if (rowSelection?.type === 'checkbox') {
      const isSelected = selectedRowKeys.includes(key);
      const newSelectedKeys = isSelected
        ? selectedRowKeys.filter((k) => k !== key)
        : [...selectedRowKeys, key];
      setSelectedRowKeys(newSelectedKeys);
      rowSelection?.onChange?.(
        newSelectedKeys,
        dataSource.filter((row) => newSelectedKeys.includes(row.key))
      );
    } else if (rowSelection?.type === 'radio') {
      setSelectedRowKeys([key]);
      rowSelection?.onChange?.([key], [record]);
    }
  };

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
    <div>
      <table>
        <thead>
          <tr>
            {rowSelection && <th></th>}
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((record, index) => (
            <tr key={record.key}>
              {rowSelection && (
                <td>
                  {rowSelection.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={selectedRowKeys.includes(record.key)}
                      onChange={() => handleRowSelection(record.key, record)}
                    />
                  ) : (
                    <input
                      type="radio"
                      checked={selectedRowKeys.includes(record.key)}
                      onChange={() => handleRowSelection(record.key, record)}
                    />
                  )}
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(record[column.dataIndex], record, index)
                    : record[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="pagination">
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
