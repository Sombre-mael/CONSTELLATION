import { useState, useEffect, useCallback } from 'react';
import { CoinLoreResponse, Cryptocurrency } from '@/lib/types';

const COINLORE_API = 'https://api.coinlore.net/api/tickers/';

export function useCryptoPrices() {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCryptoPrices = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await fetch(COINLORE_API);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: CoinLoreResponse = await response.json();
      setCryptocurrencies(data.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch cryptocurrency data';
      setError(errorMessage);
      console.error('Error fetching crypto prices:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCryptoPrices();
  }, [fetchCryptoPrices]);

  const refresh = useCallback(async () => {
    await fetchCryptoPrices(true);
  }, [fetchCryptoPrices]);

  return {
    cryptocurrencies,
    loading,
    error,
    refreshing,
    refresh,
    retry: () => fetchCryptoPrices(),
  };
}
