import { SortOptions } from '../types';

export const getUniqueId = (prefix: unknown): string =>
  `${prefix ?? 'id'}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export const cx = (classNames: (string | boolean)[]): string =>
  classNames.filter((i) => i).join(' ');

export const sortData = <T>({
  dataSource,
  sortBy,
  sortOrder = 'asc',
}: SortOptions<T>): T[] => {
  if (!sortBy || !sortOrder) return dataSource;
  return dataSource.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    // Handle null or undefined values
    if (aValue == null) return 1; // Push `null` or `undefined` to the end
    if (bValue == null) return -1;

    // Handle numbers
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Handle strings
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === 'asc' ? comparison : -comparison;
    }

    // Default to no change for unsupported types
    return 0;
  });
};
