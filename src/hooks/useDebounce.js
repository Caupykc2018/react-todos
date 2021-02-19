import { useEffect } from 'react';

export const useDebounce = (fn, ms, deps) => {
  useEffect(() => {
    const idTimeout = setTimeout(fn, ms);

    return () => clearTimeout(idTimeout);
  }, [...deps]);
};
