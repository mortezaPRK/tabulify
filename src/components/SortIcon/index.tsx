import React from 'react';
import { SortOrder } from '../../types';
import { IconCartDown } from './IconCartDown';
import { IconCartUp } from './IconCartUp';

interface Props {
  sortOrder: SortOrder;
}
export const SortIcon: React.FC<Props> = ({ sortOrder }) => {
  if (sortOrder === 'asc') return <IconCartDown />;
  return <IconCartUp />;
};
