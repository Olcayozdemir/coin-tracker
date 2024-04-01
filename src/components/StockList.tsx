import React from "react";
import { List } from "@mui/material";
import { Coin } from "@/services/api";
import CoinItem from "./CoinItem";

const StockList = ({
  portfolio,
  onUpdate,
  onRemove,
}: {
  portfolio: { coin: Coin; amount: number }[];
  onUpdate: (coin: Coin, amount: number) => void;
  onRemove: (coin: Coin) => void;
}) => {
  return (
    <List>
      {portfolio.map((stock) => (
        <CoinItem
          key={stock.coin.symbol}
          coin={stock.coin}
          amount={stock.amount}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </List>
  );
};

export default StockList;
