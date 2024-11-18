import React from 'react';

// Generic Column Interface
export interface Column<T, K extends keyof T = keyof T> {
  title: string;
  key: K;
  sorter?: (a: T, b: T) => number;
  render?: (value: T[K], record: T, index: number) => React.ReactNode;
}

// Row Selection Interface
export interface RowSelection<T> {
  type: 'checkbox' | 'radio';
  selectedRowKeys?: (keyof T)[]; // Selected row keys
  onChange?: (selectedRowKeys: (keyof T)[], selectedRows: T[]) => void;
}

// Pagination Interface
export interface Pagination {
  pageSize: number;
  total: number;
  current?: number; // Current page
  onChange?: (page: number) => void;
}

// Table Props
export interface TableProps<T> {
  className?: string;
  columns: Column<T>[];
  dataSource: T[];
  key: keyof T;
  rowSelection?: RowSelection<T>;
  pagination?: Pagination;
  onRowClick?: (id: T[keyof T]) => void;
}
