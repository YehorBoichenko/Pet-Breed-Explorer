'use client';

import React from 'react';
import { useSearch } from '@/shared/store/store';

interface Props {
  className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
  const { searchTerm, updateSearchTerm } = useSearch((state) => state);

  return (
    <input
className={`border-gray-300 border-solid border rounded-lg h-12 outline-none px-4 ${className}`}
      value={searchTerm}
      placeholder="Search breed by name"
      onChange={(event) => updateSearchTerm(event.target.value)}
      type="text"
    />
  );
};
