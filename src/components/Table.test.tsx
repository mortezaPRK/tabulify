import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';
import { Column } from './Table.types';

interface SampleInterface {
  id: number;
  name: string;
  age: number;
}

describe('Table Component', () => {
  it('renders the table with columns', () => {
    const columns: Column<SampleInterface>[] = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
    ];

    const dataSource: SampleInterface[] = [
      { id: 1, name: 'John Doe', age: 30 },
      { id: 2, name: 'Jane Smith', age: 25 },
    ];

    render(<Table columns={columns} dataSource={dataSource} key="id" />);

    // Verify content is rendered correctly
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
