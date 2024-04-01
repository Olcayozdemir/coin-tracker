import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Autocomplete,
  Grid,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Coin } from "@/services/api";
import StockList from "./StockList";

const AddStockModal = ({
  onAdd,
  open,
  setOpen,
  coins,
  onUpdate,
  onRemove,
  portfolio,
}: {
  onAdd: (coin: Coin, amount: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  coins: Coin[];
  onUpdate: (coin: Coin, amount: number) => void;
  onRemove: (coin: Coin) => void;
  portfolio: { coin: Coin; amount: number }[];
}) => {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAdd = () => {
    if (selectedCoin && amount) {
      onAdd(selectedCoin, Number(amount));
      setSelectedCoin(null);
      setAmount("");
      setSnackbarMessage("Coin added successfully");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} sx={sxProps.container}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      <DialogTitle>Add New Coin</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={sxProps.content}>
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={5}>
            <Autocomplete
              options={coins || []}
              getOptionLabel={(option) => option.symbol}
              value={selectedCoin}
              onChange={(event, newValue) => setSelectedCoin(newValue)}
              renderInput={(params) => <TextField {...params} label="Symbol" />}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined" color="primary" onClick={handleAdd}>
              Add
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <StockList
          portfolio={portfolio || []}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      </DialogContent>
    </Dialog>
  );
};

const sxProps = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    ".MuiDialog-paper": {
      maxWidth: ["90%", "900px"],
      width: "100%",
    },
  },
  content: {
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
  },
};

export default AddStockModal;
