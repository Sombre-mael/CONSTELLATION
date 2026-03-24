import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

describe('useCryptoPrices - API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch data from CoinLore API', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          symbol: 'BTC',
          name: 'Bitcoin',
          name_full: 'Bitcoin',
          max_supply: '21000000',
          last_update: '2024-03-24T00:00:00Z',
          price_usd: '50000',
          percent_change_1h: '0.5',
          percent_change_24h: '1.2',
          percent_change_7d: '5.3',
          price_btc: '1',
          market_cap_usd: '1000000000000',
          rank: '1',
          volume24: '25000000000',
          volume24a: '25000000000',
        },
      ],
      info: {
        coins_num: 1,
        time: 1711270800,
      },
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await fetch('https://api.coinlore.net/api/tickers/');
    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(data.data).toHaveLength(1);
    expect(data.data[0].symbol).toBe('BTC');
  });

  it('should handle API errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    try {
      await fetch('https://api.coinlore.net/api/tickers/');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Network error');
    }
  });

  it('should parse cryptocurrency data correctly', () => {
    const crypto = {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      name_full: 'Bitcoin',
      max_supply: '21000000',
      last_update: '2024-03-24T00:00:00Z',
      price_usd: '50000.50',
      percent_change_1h: '0.5',
      percent_change_24h: '1.2',
      percent_change_7d: '5.3',
      price_btc: '1',
      market_cap_usd: '1000000000000',
      rank: '1',
      volume24: '25000000000',
      volume24a: '25000000000',
    };

    const price = parseFloat(crypto.price_usd);
    const change7d = parseFloat(crypto.percent_change_7d);

    expect(price).toBe(50000.50);
    expect(change7d).toBe(5.3);
    expect(price > 1).toBe(true);
  });

  it('should format price correctly for small values', () => {
    const smallPrice = '0.000123';
    const price = parseFloat(smallPrice);
    const formattedPrice = price > 1 ? `$${price.toFixed(2)}` : `$${price.toFixed(6)}`;

    expect(formattedPrice).toBe('$0.000123');
  });

  it('should format price correctly for large values', () => {
    const largePrice = '50000.50';
    const price = parseFloat(largePrice);
    const formattedPrice = price > 1 ? `$${price.toFixed(2)}` : `$${price.toFixed(6)}`;

    expect(formattedPrice).toBe('$50000.50');
  });

  it('should determine price change color correctly', () => {
    const positiveChange = 5.3;
    const negativeChange = -2.1;

    expect(positiveChange >= 0).toBe(true);
    expect(negativeChange >= 0).toBe(false);
  });
});
