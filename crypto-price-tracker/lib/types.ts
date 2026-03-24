/**
 * Types for cryptocurrency data from CoinLore API
 */

export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  name_full: string;
  max_supply: string;
  last_update: string;
  price_usd: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  rank: string;
  volume24: string;
  volume24a: string;
}

export interface CoinLoreResponse {
  data: Cryptocurrency[];
  info: {
    coins_num: number;
    time: number;
  };
}

export interface CryptoPriceState {
  cryptocurrencies: Cryptocurrency[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}
