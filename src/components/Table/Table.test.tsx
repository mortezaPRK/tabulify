import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './';
import { Column } from '../../types';

interface SampleInterface {
  id: number;
  name: string;
  age: number;
}

const columns: Column<SampleInterface>[] = [
  {
    title: 'Name',
    key: 'name',
    render: (value) => <div data-testid={`test-name-${value}`}>{value}</div>,
  },
  {
    title: 'Age',
    key: 'age',
  },
];

const dataSource: SampleInterface[] = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Armin', age: 25 },
];

describe('Table Component', () => {
  it('renders the table with columns', () => {
    render(<Table columns={columns} dataSource={dataSource} dataIndex="id" />);

    // Verify content is rendered correctly
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('test-name-Armin')).toHaveTextContent('Armin');
  });

  it('renders the table with no data', () => {
    render(<Table columns={columns} dataSource={[]} dataIndex="id" />);

    // Verify content is rendered correctly
    expect(screen.getByTestId('no-data')).toBeVisible();
  });

  it('renders the table with loading state', () => {
    render(<Table columns={columns} loading dataSource={[]} dataIndex="id" />);

    // Verify content is rendered correctly
    expect(screen.getByTestId('fetching-data')).toBeVisible();
  });
});
