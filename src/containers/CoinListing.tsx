import { useMemo, useState } from "react";
import AddStockModal from "../components/AddStockModal";
import StockList from "../components/StockList";
import PortfolioChart from "../components/PortfolioChart";
import { Box, Button, Grid, Snackbar } from "@mui/material";
import { Coin, fetchCoins } from "@/services/api";
import { useQuery } from "react-query";

const CoinListing = () => {
  const [open, setOpen] = useState(false);
  const [portfolio, setPortfolio] = useState<{ coin: Coin; amount: number }[]>(
    []
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const { data: coins, refetch } = useQuery<Coin[]>("coins", fetchCoins, {
    refetchInterval: 300000,
    refetchIntervalInBackground: true,
  });

  const addStock = (coin: Coin, amount: number) => {
    setPortfolio((prev) => [...prev, { coin, amount }]);
  };

  const refreshPortfolio = () => {
    refetch();
    setSnackbarMessage("Portfolio refreshed successfully");
    setSnackbarOpen(true);
  };

  const removeStock = (coin: Coin) => {
    setPortfolio((prev) => prev.filter((stock) => coin !== stock.coin));
    setSnackbarMessage("Stock removed successfully");
    setSnackbarOpen(true);
  };

  const updateStock = (coin: Coin, amount: number) => {
    setPortfolio((prev) =>
      prev.map((stock) =>
        stock.coin.symbol === coin.symbol ? { ...stock, amount } : stock
      )
    );
    setSnackbarMessage("Stock updated successfully");
    setSnackbarOpen(true);
  };

  const coinsList = useMemo(() => {
    return portfolio || [];
  }, [portfolio]);

  return (
    <Box sx={sxProps.container}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      <Box sx={sxProps.row}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Stock
        </Button>
        <Button variant="contained" onClick={refreshPortfolio}>
          Refresh
        </Button>
      </Box>
      <AddStockModal
        onAdd={addStock}
        open={open}
        setOpen={setOpen}
        coins={coins || []}
        onUpdate={updateStock}
        onRemove={removeStock}
        portfolio={coinsList}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <StockList
            portfolio={coinsList}
            onUpdate={updateStock}
            onRemove={removeStock}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <PortfolioChart portfolio={coinsList} />
        </Grid>
      </Grid>
    </Box>
  );
};

const sxProps = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem",
  },
  row: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    justifyContent: "space-between",
    width: ["90%", "fit-content"],
    gap: "1rem",
  },
};

export default CoinListing;
