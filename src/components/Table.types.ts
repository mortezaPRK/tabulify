import React from 'react';

// Generic Column Interface
export interface Column<T> {
  title: string;
  dataIndex: keyof T; // Keys of the data source type
  key: string;
  sorter?: (a: T, b: T) => number;
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
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
export interface TableProps<T extends { key: React.Key }> {
  columns: Column<T>[];
  dataSource: T[];
  rowSelection?: RowSelection<T>;
  pagination?: Pagination;
}
