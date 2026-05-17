import { describe, it, expect } from 'vitest';
import { createIdSetFromArray, createIdSetFromObjects, setToArray } from './idUtils';

describe('idUtils', () => {
  it('createIdSetFromArray converts ids to strings in Set', () => {
    const set = createIdSetFromArray([1, '2', 3]);
    expect(set.has('1')).toBe(true);
    expect(set.has('2')).toBe(true);
    expect(set.has('3')).toBe(true);
    expect(set.size).toBe(3);
  });

  it('createIdSetFromObjects converts ids to strings in Set', () => {
    const objs = [{ id: 5 }, { id: '6' }];
    const set = createIdSetFromObjects(objs);
    expect(set.has('5')).toBe(true);
    expect(set.has('6')).toBe(true);
    expect(set.size).toBe(2);
  });

  it('setToArray converts Set to Array while keeping values as strings', () => {
    const set = new Set(['a', 'b']);
    const arr = setToArray(set);
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toEqual(['a', 'b']);
  });
});
