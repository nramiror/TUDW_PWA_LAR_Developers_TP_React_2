import { describe, it, expect, vi } from 'vitest';
import { handleSearchQueryChange, navigateToGameDetail } from './searchNavigation';

describe('searchNavigation', () => {
  it('handleSearchQueryChange navigates to / when the search changes in /boardgames', () => {
    const navigate = vi.fn();
    handleSearchQueryChange('/boardgames/5', 'a', 'b', navigate);
    expect(navigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('handleSearchQueryChange does not navigate if there is no change', () => {
    const navigate = vi.fn();
    handleSearchQueryChange('/boardgames/5', 'a', 'a', navigate);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('navigateToGameDetail does not navigate with undefined/null', () => {
    const navigate = vi.fn();
    navigateToGameDetail(undefined, navigate);
    navigateToGameDetail(null, navigate);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('navigateToGameDetail navigates with object and state', () => {
    const navigate = vi.fn();
    navigateToGameDetail({ id: 5, name: 'x' }, navigate);
    expect(navigate).toHaveBeenCalledWith('/boardgames/5', { state: { item: { id: 5, name: 'x' } } });
  });

  it('navigateToGameDetail navigates with id', () => {
    const navigate = vi.fn();
    navigateToGameDetail('9', navigate);
    expect(navigate).toHaveBeenCalledWith('/boardgames/9');
  });
});
