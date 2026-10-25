import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { staticPortfolio } from '../data/portfolio.js';

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim();
const api = apiBaseUrl ? axios.create({ baseURL: apiBaseUrl, timeout: 10000 }) : null;

export function useFetch(path) {
  const [data, setData] = useState(staticPortfolio);
  const [loading, setLoading] = useState(Boolean(api));
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    if (!api) {
      setData(staticPortfolio);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(path);
      const portfolio = response.data?.data;
      if (
        !portfolio?.profile ||
        !Array.isArray(portfolio.skills) ||
        !Array.isArray(portfolio.projects) ||
        !Array.isArray(portfolio.education) ||
        !Array.isArray(portfolio.achievements)
      ) {
        throw new Error('The portfolio API returned incomplete data.');
      }
      setData(portfolio);
    } catch {
      setData(staticPortfolio);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
