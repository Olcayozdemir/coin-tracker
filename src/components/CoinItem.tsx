import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ListItem, ListItemText, TextField, Button } from "@mui/material";
import { Coin } from "@/services/api";

const CoinItem = ({
  coin,
  amount,
  onUpdate,
  onRemove,
}: {
  coin: Coin;
  amount: number;
  onUpdate: (coin: Coin, amount: number) => void;
  onRemove: (coin: Coin) => void;
}) => {
  const { control, handleSubmit, reset } = useForm<{ amount: number }>({
    defaultValues: { amount: amount },
  });

  const onSubmit = (data: { amount: number }) => {
    onUpdate(coin, data.amount);
    reset({ amount: data.amount });
  };

  return (
    <ListItem
      divider
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ListItemText
        primary={coin.symbol}
        secondary={`Last Price: ${coin.lastPrice}`}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Amount"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              margin="dense"
              style={{ width: "90px", marginRight: "1rem" }}
            />
          )}
        />
        <Button variant="outlined" color="primary" type="submit">
          Update
        </Button>
      </form>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => onRemove(coin)}
      >
        Remove
      </Button>
    </ListItem>
  );
};

export default CoinItem;
