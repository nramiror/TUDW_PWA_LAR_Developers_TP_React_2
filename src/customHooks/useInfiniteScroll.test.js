import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInfiniteScroll } from './useInfiniteScroll';

let intersectionCallback;
let observeMock;
let disconnectMock;

class IntersectionObserverMock {
  constructor(callback) {
    intersectionCallback = callback;
  }

  observe() {
    observeMock();
  }

  disconnect() {
    disconnectMock();
  }
}

global.IntersectionObserver = IntersectionObserverMock;
if (typeof window !== 'undefined') {
  window.IntersectionObserver = IntersectionObserverMock;
}

describe('useInfiniteScroll', () => {
  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
  });

  afterEach(() => {
    intersectionCallback = null;
  });

  it('loads first page on mount and exposes initial state', async () => {
    const fetchFunction = vi
      .fn()
      .mockResolvedValueOnce([{ id: 1, name: 'Catan' }, { id: 2, name: 'Azul' }]);

    const { result, unmount } = renderHook(() =>
      useInfiniteScroll(fetchFunction, { pageSize: 2 }),
    );

    await waitFor(() => {
      expect(fetchFunction).toHaveBeenCalledTimes(1);
      expect(result.current.items).toEqual([
        { id: 1, name: 'Catan' },
        { id: 2, name: 'Azul' },
      ]);
      expect(result.current.loading).toBe(false);
    });

    expect(fetchFunction.mock.calls[0][0]).toBe(1);
    expect(fetchFunction.mock.calls[0][1]).toBe('');
    expect(fetchFunction.mock.calls[0][2]).toBe(2);
    expect(fetchFunction.mock.calls[0][3]).toBeInstanceOf(AbortSignal);

    expect(result.current.items).toEqual([
      { id: 1, name: 'Catan' },
      { id: 2, name: 'Azul' },
    ]);
    expect(result.current.page).toBe(1);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loading).toBe(false);

    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('loads next page when intersection happens after first load', async () => {
    const fetchFunction = vi
      .fn()
      .mockResolvedValueOnce([{ id: 1, name: 'Catan' }, { id: 2, name: 'Azul' }])
      .mockResolvedValueOnce([{ id: 3, name: 'Carcassonne' }]);

    const { result } = renderHook(() =>
      useInfiniteScroll(fetchFunction, { pageSize: 2 }),
    );

    await waitFor(() => {
      expect(result.current.items).toHaveLength(2);
    });

    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    await waitFor(() => {
      expect(result.current.items).toHaveLength(3);
    });

    expect(fetchFunction.mock.calls[1][0]).toBe(2);
    expect(result.current.page).toBe(2);
    expect(result.current.items).toEqual([
      { id: 1, name: 'Catan' },
      { id: 2, name: 'Azul' },
      { id: 3, name: 'Carcassonne' },
    ]);
    expect(result.current.hasMore).toBe(false);
  });

  it('resetScroll restores page, items and hasMore state', async () => {
    const fetchFunction = vi
      .fn()
      .mockResolvedValueOnce([{ id: 1, name: 'Catan' }, { id: 2, name: 'Azul' }])
      .mockResolvedValueOnce([{ id: 3, name: 'Carcassonne' }]);

    const { result } = renderHook(() =>
      useInfiniteScroll(fetchFunction, { pageSize: 2 }),
    );

    await waitFor(() => {
      expect(result.current.items).toHaveLength(2);
    });

    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    await waitFor(() => {
      expect(result.current.items).toHaveLength(3);
    });

    expect(result.current.hasMore).toBe(false);

    act(() => {
      result.current.resetScroll();
    });

    expect(result.current.page).toBe(1);
    expect(result.current.items).toEqual([]);
    expect(result.current.hasMore).toBe(true);
  });
});
