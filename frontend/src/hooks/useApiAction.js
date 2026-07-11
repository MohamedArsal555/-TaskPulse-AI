import { useCallback, useState } from 'react';

// Wraps a single async API call with loading/data/error state.
export function useApiAction(action) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);
      try {
        const result = await action(payload);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setData(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [action]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, error, loading, run, reset };
}
