import { renderHook, act } from '@testing-library/react';

import { useSortTable } from './useSortTable';

interface TestData {
  id: number;
  name: string;
  age: number;
}

describe('useSortTable', () => {
  describe('Initial State', () => {
    test("initializes with default sort and 'asc' order", () => {
      const { result } = renderHook(() =>
        useSortTable<TestData>({ defaultSort: 'id' })
      );

      expect(result.current.sortBy).toBe('id');
      expect(result.current.sortOrder).toBe('asc');
    });
  });
  describe('Change sortBy to a New Field', () => {
    test("changes sortBy to a new field and resets sortOrder to 'asc'", () => {
      const { result } = renderHook(() =>
        useSortTable<TestData>({ defaultSort: 'id' })
      );

      act(() => {
        result.current.handleSortBy('name');
      });

      expect(result.current.sortBy).toBe('name');
      expect(result.current.sortOrder).toBe('asc');
    });
  });
  describe('Toggle sortOrder for the Same Field', () => {
    test('toggles sortOrder when the same sortBy field is selected', () => {
      const { result } = renderHook(() =>
        useSortTable<TestData>({ defaultSort: 'id' })
      );

      act(() => {
        result.current.handleSortBy('id');
      });

      expect(result.current.sortOrder).toBe('desc');

      act(() => {
        result.current.handleSortBy('id');
      });

      expect(result.current.sortOrder).toBe('asc');
    });
  });
  describe('Handle Multiple Changes', () => {
    test('handles multiple changes to sortBy and sortOrder', () => {
      const { result } = renderHook(() =>
        useSortTable<TestData>({ defaultSort: 'id' })
      );

      // Change to a new field
      act(() => {
        result.current.handleSortBy('name');
      });

      expect(result.current.sortBy).toBe('name');
      expect(result.current.sortOrder).toBe('asc');

      // Toggle sortOrder for "name"
      act(() => {
        result.current.handleSortBy('name');
      });

      expect(result.current.sortOrder).toBe('desc');

      // Change to another field
      act(() => {
        result.current.handleSortBy('age');
      });

      expect(result.current.sortBy).toBe('age');
      expect(result.current.sortOrder).toBe('asc');
    });
  });
});
