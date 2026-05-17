import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useFavoriteGames } from './useFavoriteGames';

const mocks = vi.hoisted(() => ({
  storedFavorites: [],
  useLocalStorageMock: vi.fn(),
  matchesInitialLettersMock: vi.fn((game, searchQuery) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase()),
  ),
}));

vi.mock('./useLocalStorage', () => ({
  useLocalStorage: mocks.useLocalStorageMock,
}));

vi.mock('../services/boardgames', () => ({
  matchesInitialLetters: mocks.matchesInitialLettersMock,
}));

describe('useFavoriteGames', () => {
  beforeEach(() => {
    mocks.useLocalStorageMock.mockReset();
    mocks.matchesInitialLettersMock.mockClear();
  });

  it('exposes the stored favorites and derived data', () => {
    const setFavoriteGames = vi.fn();
    mocks.storedFavorites = [{ id: 1, name: 'Catan' }];
    mocks.useLocalStorageMock.mockReturnValue([mocks.storedFavorites, setFavoriteGames]);

    const { result } = renderHook(() => useFavoriteGames(''));

    expect(result.current.favoriteGames).toEqual([{ id: 1, name: 'Catan' }]);
    expect(result.current.favoriteIds).toEqual(['1']);
    expect(result.current.favoritesWithFlag).toEqual([
      { id: 1, name: 'Catan', isFavorite: true },
    ]);
    expect(result.current.filteredFavoritesWithFlag).toEqual([
      { id: 1, name: 'Catan', isFavorite: true },
    ]);
  });

  it('ignores invalid games and toggles valid ones through the setter updater', () => {
    const setFavoriteGames = vi.fn();
    mocks.storedFavorites = [];
    mocks.useLocalStorageMock.mockReturnValue([mocks.storedFavorites, setFavoriteGames]);

    const { result } = renderHook(() => useFavoriteGames());

    act(() => {
      result.current.handleToggleFavorite(null);
    });

    expect(setFavoriteGames).not.toHaveBeenCalled();

    act(() => {
      result.current.handleToggleFavorite({ id: 7, name: 'Azul' });
    });

    expect(setFavoriteGames).toHaveBeenCalledTimes(1);

    const updater = setFavoriteGames.mock.calls[0][0];
    expect(updater([])).toEqual([{ id: '7', name: 'Azul', isFavorite: true }]);
  });

  it('syncs visible favorites and skips empty arrays', () => {
    const setFavoriteGames = vi.fn();
    mocks.storedFavorites = [{ id: 1, name: 'Old name', isFavorite: true }];
    mocks.useLocalStorageMock.mockReturnValue([mocks.storedFavorites, setFavoriteGames]);

    const { result } = renderHook(() => useFavoriteGames());

    act(() => {
      result.current.syncFavoriteGames([]);
    });

    expect(setFavoriteGames).not.toHaveBeenCalled();

    act(() => {
      result.current.syncFavoriteGames([{ id: 1, name: 'New name' }]);
    });

    expect(setFavoriteGames).toHaveBeenCalledTimes(1);

    const updater = setFavoriteGames.mock.calls[0][0];
    expect(updater(mocks.storedFavorites)).toEqual([
      { id: '1', name: 'New name', isFavorite: true },
    ]);
  });
});