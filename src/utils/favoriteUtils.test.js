import { describe, it, expect, vi } from 'vitest';
import {
  isValidGame,
  createFavoriteIdSet,
  addFavoriteFlag,
  filterGamesBySearch,
  toggleGameInFavorites,
  hasDifferences,
  syncFavoritesWithVisible,
  findFavoriteGameById,
} from './favoriteUtils';

describe('favoriteUtils', () => {
  it('isValidGame detects valid games', () => {
    expect(isValidGame({ id: 1 })).toBe(true);
    expect(isValidGame({})).toBe(false);
    expect(isValidGame(null)).toBe(false);
  });

  it('createFavoriteIdSet creates a Set of IDs from objects', () => {
    const set = createFavoriteIdSet([{ id: 1 }, { id: '2' }]);
    expect(set.has('1')).toBe(true);
    expect(set.has('2')).toBe(true);
  });

  it('addFavoriteFlag adds isFavorite true', () => {
    const games = [{ id: 1, name: 'a' }];
    const out = addFavoriteFlag(games);
    expect(out[0].isFavorite).toBe(true);
  });

  it('filterGamesBySearch delegate matchFn', () => {
    const games = [{ id: 1 }, { id: 2 }];
    const matchFn = (g, q) => g.id === Number(q);
    const out = filterGamesBySearch(games, '2', matchFn);
    expect(out).toEqual([{ id: 2 }]);
  });

  it('toggleGameInFavorites adds and removes correctly', () => {
    const game = { id: 3, name: 'x' };
    const prev = [{ id: 3 }];
    const removed = toggleGameInFavorites(game, prev);
    expect(removed).toEqual([]);

    const added = toggleGameInFavorites({ id: 4, name: 'y' }, prev);
    expect(added.some((f) => String(f.id) === '4')).toBe(true);
    expect(added.find((f) => f.id === '4').isFavorite).toBe(true);
  });

  it('hasDifferences detects changes in keys/values', () => {
    expect(hasDifferences({ a: 1 }, { a: 1 })).toBe(false);
    expect(hasDifferences({ a: 1 }, { a: 2 })).toBe(true);
    expect(hasDifferences({ a: 1 }, { a: 1, b: 2 })).toBe(true);
  });

  it('syncFavoritesWithVisible updates favorites when they change', () => {
    const visible = [{ id: 1, name: 'one' }, { id: 2, name: 'two-new' }];
    const prev = [{ id: '1', name: 'one' }, { id: '2', name: 'two' }];
    const next = syncFavoritesWithVisible(visible, prev);
    expect(next).not.toBe(prev);
    expect(next.find((f) => String(f.id) === '2').name).toBe('two-new');
  });

  it('findFavoriteGameById finds by id', () => {
    const games = [{ id: '10' }, { id: 11 }];
    expect(findFavoriteGameById(games, 10)).toEqual(games[0]);
  });
});
