import { FlatList, RefreshControl, View, Text, Pressable, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { CryptoCard } from '@/components/crypto-card';
import { useCryptoPrices } from '@/hooks/use-crypto-prices';
import { useColors } from '@/hooks/use-colors';

export default function HomeScreen() {
  const colors = useColors();
  const { cryptocurrencies, loading, error, refreshing, refresh, retry } = useCryptoPrices();

  if (loading && cryptocurrencies.length === 0) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-4 text-base text-muted">Loading cryptocurrencies...</Text>
      </ScreenContainer>
    );
  }

  if (error && cryptocurrencies.length === 0) {
    return (
      <ScreenContainer className="flex-1 items-center justify-center p-4">
        <Text className="text-lg font-bold text-foreground mb-2">Error</Text>
        <Text className="text-base text-muted text-center mb-6">
          {error}
        </Text>
        <Pressable
          onPress={retry}
          className="bg-primary px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </Pressable>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="flex-1">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-3xl font-bold text-foreground">
            Crypto Prices
          </Text>
          <Text className="text-sm text-muted mt-1">
            {cryptocurrencies.length} cryptocurrencies
          </Text>
        </View>

        {/* Crypto List */}
        <FlatList
          data={cryptocurrencies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CryptoCard crypto={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-8">
              <Text className="text-base text-muted">No cryptocurrencies found</Text>
            </View>
          }
        />

        {/* Error Message for Refresh */}
        {error && cryptocurrencies.length > 0 && (
          <View className="bg-error/10 border border-error rounded-lg mx-4 mb-4 p-3">
            <Text className="text-sm text-error">{error}</Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
