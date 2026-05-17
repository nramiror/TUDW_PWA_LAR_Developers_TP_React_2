import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLanguagePreference } from './useLanguagePreference';

const mocks = vi.hoisted(() => ({
  preferredLanguage: null,
  useLocalStorageMock: vi.fn(),
  i18n: {
    language: 'es',
    changeLanguage: vi.fn(),
  },
}));

vi.mock('./useLocalStorage', () => ({
  useLocalStorage: mocks.useLocalStorageMock,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: mocks.i18n }),
}));

describe('useLanguagePreference', () => {
  beforeEach(() => {
    mocks.useLocalStorageMock.mockReset();
    mocks.i18n.changeLanguage.mockReset();
    mocks.preferredLanguage = null;
    mocks.i18n.language = 'es';
  });

  it('exposes currentLanguage from i18n when present', () => {
    mocks.i18n.language = 'fr';
    mocks.useLocalStorageMock.mockReturnValue([null, vi.fn()]);

    const { result } = renderHook(() => useLanguagePreference());

    expect(result.current.currentLanguage).toBe('fr');
  });

  it("falls back to 'es' when i18n.language is undefined", () => {
    mocks.i18n.language = undefined;
    mocks.useLocalStorageMock.mockReturnValue([null, vi.fn()]);

    const { result } = renderHook(() => useLanguagePreference());

    expect(result.current.currentLanguage).toBe('es');
  });

  it('changes i18n language on mount when preferredLanguage differs', () => {
    const setPreferred = vi.fn();
    mocks.preferredLanguage = 'en';
    mocks.useLocalStorageMock.mockReturnValue([mocks.preferredLanguage, setPreferred]);
    mocks.i18n.language = 'es';

    renderHook(() => useLanguagePreference());

    expect(mocks.i18n.changeLanguage).toHaveBeenCalledWith('en');
  });

  it('does not change language when i18n.language already starts with preferredLanguage', () => {
    const setPreferred = vi.fn();
    mocks.preferredLanguage = 'en';
    mocks.useLocalStorageMock.mockReturnValue([mocks.preferredLanguage, setPreferred]);
    mocks.i18n.language = 'en-US';

    renderHook(() => useLanguagePreference());

    expect(mocks.i18n.changeLanguage).not.toHaveBeenCalled();
  });

  it('changeLanguage calls i18n.changeLanguage and updates preferred language', () => {
    const setPreferred = vi.fn();
    mocks.useLocalStorageMock.mockReturnValue([null, setPreferred]);

    const { result } = renderHook(() => useLanguagePreference());

    act(() => {
      result.current.changeLanguage('pt');
    });

    expect(mocks.i18n.changeLanguage).toHaveBeenCalledWith('pt');
    expect(setPreferred).toHaveBeenCalledWith('pt');
  });
});
