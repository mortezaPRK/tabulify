import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TableProps } from '../../types';
import { cx, getUniqueId, sortData } from '../../utils';
import Pagination from '../Pagination';
import { SortIcon } from '../SortIcon';

// Table Component
const Table = <T,>({
  columns,
  dataSource,
  rowSelection,
  pagination,
  dataIndex,
  className,
  width,
  testId,
  sort,
  onRowClick,
}: TableProps<T>) => {
  const containerRef: React.Ref<HTMLDivElement> = useRef(null);

  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrollStarted, setIsScrollStarted] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;
      setIsScrollStarted(container.scrollLeft > 0);
      setIsScrolledToEnd(isAtEnd);
    }
  };

  const [currentPage, setCurrentPage] = useState(pagination?.current || 1);

  const pageSize = pagination?.pageSize || dataSource.length;

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pagination?.onChange?.(page);
  };

  // Sorted Data
  const sortedData = sortData({
    dataSource,
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
  });

  // Paginate data
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      handleScroll(); // Initial check
    }
  }, []);

  return (
    <div className={className} data-testid={testId}>
      <div className="tabulify-wrapper">
        <div
          className={cx([
            'tabulify-container',
            width && 'has-scroll',
            isScrolledToEnd && 'hide-right-shadow',
            !isScrollStarted && 'hide-left-shadow',
          ])}
          ref={containerRef}
          onScroll={handleScroll}
        >
          <table className="tabulify-table" style={{ width: width ?? '100%' }}>
            <thead className="tabulify-head">
              <tr>
                {rowSelection && <th></th>}
                {columns.map((column) => (
                  <th
                    className={cx([
                      'tabulify-cell',
                      Boolean(sort) && 'has-hover',
                    ])}
                    key={getUniqueId(column.key)}
                    data-testid={`table-head-th-${String(column.key)}`}
                    onClick={() => sort?.onSort(column.key)}
                  >
                    <div>{column.title}</div>
                    {sort?.sortBy === column.key && (
                      <SortIcon sortOrder={sort.sortOrder} />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tabulify-body">
              {paginatedData.map((record, index) => (
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
                        <>{`${record[column.key]}`}</>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {pagination && (
        <div className="tabulify-pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            total={pagination.total}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
