import React from 'react';
import { SortOrder } from '../../types';
import { IconCartDown } from '../Icons/IconCartDown';
import { IconCartUp } from '../Icons/IconCartUp';

interface Props {
  sortOrder: SortOrder;
}
export const SortIcon: React.FC<Props> = ({ sortOrder }) => {
  if (sortOrder === 'asc') return <IconCartDown />;
  return <IconCartUp />;
};
