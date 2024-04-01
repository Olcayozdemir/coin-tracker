import axios from "axios";

export interface Coin {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  lastPrice: string;
  volume: string;
}
const BASE_URL = "https://api2.binance.com/api/v3/ticker/24hr";

export const fetchCoins = async (): Promise<Coin[]> => {
  const response = await axios.get<Coin[]>(BASE_URL);
  return response.data;
};
