import React from 'react';
import { IconProps } from '../../types';

const IconBrandDatabricks: React.FC<Partial<IconProps>> = ({
  width = '24',
  height,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon-brand-databricks"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 17l9 5l9 -5v-3l-9 5l-9 -5v-3l9 5l9 -5v-3l-9 5l-9 -5l9 -5l5.418 3.01" />
    </svg>
  );
};

export default IconBrandDatabricks;
