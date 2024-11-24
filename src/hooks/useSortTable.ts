import { useState } from 'react';
import { SortBy, SortOrder } from '../types';

interface Props<T> {
  defaultSort: SortBy<T>;
}
export const useSortTable = <T>({ defaultSort }: Props<T>) => {
  const [sortBy, setSortby] = useState<SortBy<T>>(defaultSort);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSortBy = (newSortBy: keyof T) => {
    if (newSortBy === sortBy) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortby(newSortBy as SortBy<T>);
    setSortOrder('asc');
  };

  return { handleSortBy, sortBy, sortOrder };
};
