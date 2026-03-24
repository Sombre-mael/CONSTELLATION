# Design - Crypto Price Tracker

## Screen List

1. **Home Screen (Cryptocurrency List)**
   - Main screen displaying a scrollable list of cryptocurrencies
   - Each cryptocurrency item shows rank, name, symbol, price, and 7-day change

## Primary Content and Functionality

### Home Screen
- **Header**: App title "Crypto Prices"
- **List Items**: Each cryptocurrency card displays:
  - Rank badge (e.g., "#1")
  - Cryptocurrency icon (placeholder or symbol)
  - Name (e.g., "Bitcoin")
  - Symbol (e.g., "BTC")
  - Current price in USD (e.g., "$16,735.96")
  - 7-day percentage change (color-coded: green for positive, red for negative)
- **Loading State**: Spinner while fetching data from CoinLore API
- **Error State**: Error message with retry button if API call fails
- **Pull-to-Refresh**: Refresh the list to get latest prices

## Key User Flows

1. **App Launch**
   - User opens the app
   - Loading spinner appears
   - API call to CoinLore (Tickers endpoint)
   - List populates with cryptocurrency data
   - User can scroll through the list

2. **Pull-to-Refresh**
   - User pulls down on the list
   - Loading indicator appears
   - API call refreshes data
   - List updates with new prices

3. **Error Handling**
   - If API fails, show error message
   - Provide "Retry" button to attempt again

## Color Choices

- **Primary Brand Color**: `#0a7ea4` (Modern teal/blue)
- **Success (Positive Change)**: `#22C55E` (Green)
- **Error (Negative Change)**: `#EF4444` (Red)
- **Background**: `#ffffff` (Light mode) / `#151718` (Dark mode)
- **Surface/Card**: `#f5f5f5` (Light mode) / `#1e2022` (Dark mode)
- **Text Primary**: `#11181C` (Light mode) / `#ECEDEE` (Dark mode)
- **Text Secondary**: `#687076` (Light mode) / `#9BA1A6` (Dark mode)

## Layout Specifics

- **Portrait orientation** (9:16 aspect ratio)
- **One-handed usage**: Content within thumb reach, critical buttons at bottom half
- **Card-based list**: Each cryptocurrency in a distinct card with subtle shadow
- **Spacing**: 16px padding, 12px between list items
- **Typography**:
  - Header: 24px bold
  - Cryptocurrency name: 16px bold
  - Price: 18px bold
  - Symbol & change: 14px regular
