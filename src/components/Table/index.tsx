import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TableProps } from '../../types';
import { getUniqueId } from '../../utils';
import Pagination from '../Pagination';

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
  onRowClick,
}: TableProps<T>) => {
  const containerRef: React.Ref<HTMLDivElement> = useRef(null);

  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrollStarted, setIsScrollStarted] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;

      console.log('DEBUG', {
        width: container.scrollWidth,
        cw: container.clientWidth,
        left: container.scrollLeft,
      });
      setIsScrollStarted(container.scrollLeft > 0);
      setIsScrolledToEnd(isAtEnd);
      setHasScroll(container.scrollWidth >= container.clientWidth);
    }
  };

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

  const containerClassNames = useMemo(() => {
    const classes = ['tabulify-container'];
    if (hasScroll) classes.push('has-scroll');
    if (isScrolledToEnd) classes.push('hide-right-shadow');
    if (!isScrollStarted) classes.push('hide-left-shadow');

    return classes.join(' ');
  }, [hasScroll, isScrolledToEnd, isScrollStarted]);

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
          className={containerClassNames}
          ref={containerRef}
          onScroll={handleScroll}
        >
          <table className="tabulify-table" style={{ width: width ?? '100%' }}>
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
                  className={Boolean(onRowClick) ? 'has-hover' : ''}
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
