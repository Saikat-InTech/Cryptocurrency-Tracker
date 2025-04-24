# Real-Time Cryptocurrency Tracker

A responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices, similar to CoinMarketCap.

## Features

- Real-time price updates via Binance WebSocket API
- Responsive UI that works on mobile and desktop
- Redux Toolkit for state management
- Color-coded percentage changes
- 7-day price charts
- Favorite cryptocurrency tracking

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Real-time Updates**: Binance WebSocket API
- **TypeScript**: For type safety

## Architecture

The application follows a clean architecture pattern:

- **Components**: UI components for rendering the cryptocurrency data
- **Redux Store**: Central state management with slices for cryptocurrency data
- **Services**: API services for fetching data from Binance
- **Types**: TypeScript interfaces for type safety

2. Install dependencies:
   
   npm install
 

3. Run the development server:

   npm run dev
  

4. Open http://localhost:3000 in your browser.

## Data Flow

1. Initial data is fetched from the Binance API when the application loads
2. WebSocket connection is established for real-time price updates
3. Updates are dispatched to Redux store
4. UI components re-render when relevant state changes

