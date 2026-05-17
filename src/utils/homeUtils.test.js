import { describe, it, expect } from 'vitest';
import {
  createFavoriteIdSet,
  enrichGamesWithFavorites,
  findGameById,
  getEmptyStateMessage,
  shouldShowLoader,
} from './homeUtils';

describe('homeUtils', () => {
  it('createFavoriteIdSet delegates to idUtils and creates a string set', () => {
    const set = createFavoriteIdSet([1, '2']);
    expect(set.has('1')).toBe(true);
    expect(set.has('2')).toBe(true);
  });

  it('enrichGamesWithFavorites adds isFavorite based on the Set', () => {
    const games = [{ id: 1 }, { id: '2' }];
    const favSet = new Set(['2']);
    const enriched = enrichGamesWithFavorites(games, favSet);
    expect(enriched[0].isFavorite).toBe(false);
    expect(enriched[1].isFavorite).toBe(true);
  });

  it('findGameById finds by id as string or number', () => {
    const games = [{ id: 10 }, { id: '11' }];
    expect(findGameById(games, '10')).toEqual(games[0]);
    expect(findGameById(games, 11)).toEqual(games[1]);
  });

  it('getEmptyStateMessage uses the correct t function based on search', () => {
    const t = (key, opts) => `${key}:${opts ? opts.search : ''}`;
    expect(getEmptyStateMessage(false, '', t)).toBe('home.noGames:');
    expect(getEmptyStateMessage(true, 'x', t)).toBe('home.noResultsForSearch:x');
  });

  it('shouldShowLoader shows loader only if loading and there are games', () => {
    expect(shouldShowLoader(true, [1])).toBe(true);
    expect(shouldShowLoader(true, [])).toBe(false);
    expect(shouldShowLoader(false, [1])).toBe(false);
  });
});
