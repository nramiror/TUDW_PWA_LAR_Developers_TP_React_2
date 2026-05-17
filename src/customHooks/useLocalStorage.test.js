import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage hook', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        localStorage.clear();
        vi.unstubAllGlobals();
    });

    it('should initialize with the initial value when localStorage is empty', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
        expect(result.current[0]).toBe('initialValue');
    });

    it('should initialize with a function that returns the initial value', () => {
        const initializer = () => 'computed value';
        const { result } = renderHook(() => useLocalStorage('testKey', initializer));
        expect(result.current[0]).toBe('computed value');
    });

    it('should retrieve value from localStorage if it exists', () => {
        localStorage.setItem('testKey', JSON.stringify('stored value'));
        const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
        expect(result.current[0]).toBe('stored value');
    });

    it('should handle stored JSON values correctly', () => {
        const testObject = { name: 'John', age: 30 };
        localStorage.setItem('testKey', JSON.stringify(testObject));
        const { result } = renderHook(() => useLocalStorage('testKey', null));
        expect(result.current[0]).toEqual(testObject);
    });

    it('should handle stored string values that are not JSON', () => {
        localStorage.setItem('testKey', 'plain string');
        const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
        expect(result.current[0]).toBe('plain string');
    });

    it('should update localStorage when state changes', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

        act(() => {
            result.current[1]('updated value');
        });

        expect(result.current[0]).toBe('updated value');
        expect(localStorage.getItem('testKey')).toBe(JSON.stringify('updated value'));
    });

    it('should update localStorage with objects', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', {}));
        const newObject = { id: 1, name: 'Test' };

        act(() => {
            result.current[1](newObject);
        });

        expect(result.current[0]).toEqual(newObject);
        expect(localStorage.getItem('testKey')).toBe(JSON.stringify(newObject));
    });

    it('should update localStorage with arrays', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', []));
        const newArray = [1, 2, 3, 4];

        act(() => {
            result.current[1](newArray);
        });

        expect(result.current[0]).toEqual(newArray);
        expect(localStorage.getItem('testKey')).toBe(JSON.stringify(newArray));
    });

    it('should handle updates with null value', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

        act(() => {
            result.current[1](null);
        });

        expect(result.current[0]).toBeNull();
        expect(localStorage.getItem('testKey')).toBe(JSON.stringify(null));
    });

    it('should handle updates with undefined value', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

        act(() => {
            result.current[1](undefined);
        });

        expect(result.current[0]).toBeUndefined();
    });

    it('should not update localStorage if value serialization is the same', () => {
        localStorage.setItem('testKey', JSON.stringify('value'));
        const setItemSpy = vi.spyOn(localStorage, 'setItem');

        const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

        act(() => {
            result.current[1]('value');
        });

        expect(setItemSpy).not.toHaveBeenCalled();
        setItemSpy.mockRestore();
    });

    it('should handle localStorage read errors gracefully', () => {
        const getItemSpy = vi
            .spyOn(localStorage, 'getItem')
            .mockImplementation(() => {
                throw new Error('localStorage read error');
            });

        const { result } = renderHook(() => useLocalStorage('testKey', 'fallback'));
        expect(result.current[0]).toBe('fallback');

        getItemSpy.mockRestore();
    });

    it('should handle localStorage write errors gracefully', () => {
        const setItemSpy = vi
            .spyOn(localStorage, 'setItem')
            .mockImplementation(() => {
                throw new Error('localStorage write error');
            });

        const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

        act(() => {
            result.current[1]('updated');
        });

        expect(result.current[0]).toBe('updated');
        setItemSpy.mockRestore();
    });

    it('should maintain separate storage for different keys', () => {
        const { result: result1 } = renderHook(() => useLocalStorage('key1', 'value1'));
        const { result: result2 } = renderHook(() => useLocalStorage('key2', 'value2'));

        expect(result1.current[0]).toBe('value1');
        expect(result2.current[0]).toBe('value2');

        act(() => {
            result1.current[1]('updated1');
        });

        expect(result1.current[0]).toBe('updated1');
        expect(result2.current[0]).toBe('value2');
    });

    it('should sync updates across multiple instances with the same key', () => {
        const { result: result1 } = renderHook(() => useLocalStorage('sharedKey', 'initial'));
        const { result: result2 } = renderHook(() => useLocalStorage('sharedKey', 'initial'));

        act(() => {
            result1.current[1]('updated');
        });

        expect(result1.current[0]).toBe('updated');
        expect(localStorage.getItem('sharedKey')).toBe(JSON.stringify('updated'));
    });

    it('should use function updater syntax when passing a function', () => {
        const { result } = renderHook(() => useLocalStorage('testKey', 10));

        act(() => {
            result.current[1]((prev) => prev + 5);
        });

        expect(result.current[0]).toBe(15);
        expect(localStorage.getItem('testKey')).toBe(JSON.stringify(15));
    });

    it('should handle boolean values correctly', () => {
        const { result } = renderHook(() => useLocalStorage('boolKey', false));

        act(() => {
            result.current[1](true);
        });

        expect(result.current[0]).toBe(true);
        expect(localStorage.getItem('boolKey')).toBe(JSON.stringify(true));
    });

    it('should handle numeric values correctly', () => {
        const { result } = renderHook(() => useLocalStorage('numKey', 0));

        act(() => {
            result.current[1](42);
        });

        expect(result.current[0]).toBe(42);
        expect(localStorage.getItem('numKey')).toBe(JSON.stringify(42));
    });

});
