import { View, Text, StyleSheet } from 'react-native';
import { Cryptocurrency } from '@/lib/types';
import { useColors } from '@/hooks/use-colors';
import { cn } from '@/lib/utils';

interface CryptoCardProps {
  crypto: Cryptocurrency;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const colors = useColors();
  const price = parseFloat(crypto.price_usd);
  const change7d = parseFloat(crypto.percent_change_7d);
  const isPositive = change7d >= 0;

  const formattedPrice = price > 1 
    ? `$${price.toFixed(2)}` 
    : `$${price.toFixed(6)}`;

  const changeColor = isPositive ? '#22C55E' : '#EF4444';
  const changeSymbol = isPositive ? '+' : '';

  return (
    <View
      className="bg-surface rounded-xl p-4 mb-3 border border-border"
      style={styles.card}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          {/* Rank Badge */}
          <View
            className="rounded-full mr-3 items-center justify-center"
            style={[
              styles.rankBadge,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text className="text-xs font-bold text-white">
              #{crypto.rank}
            </Text>
          </View>

          {/* Crypto Info */}
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground">
              {crypto.name}
            </Text>
            <Text className="text-sm text-muted">
              {crypto.symbol}
            </Text>
          </View>
        </View>

        {/* Price and Change */}
        <View className="items-end">
          <Text className="text-lg font-bold text-foreground">
            {formattedPrice}
          </Text>
          <Text
            className="text-sm font-semibold"
            style={{ color: changeColor }}
          >
            {changeSymbol}{change7d.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rankBadge: {
    width: 32,
    height: 32,
  },
});
