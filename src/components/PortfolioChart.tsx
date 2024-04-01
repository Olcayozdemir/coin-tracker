import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PieController,
} from "chart.js";
import { Coin } from "@/services/api";

ChartJS.register(ArcElement, Tooltip, Legend, PieController);

const PortfolioChart = ({
  portfolio,
}: {
  portfolio: { coin: Coin; amount: number }[];
}) => {
  const data = {
    labels:
      portfolio.length > 0
        ? portfolio.map((stock) => stock.coin.symbol)
        : ["No Data"],
    datasets: [
      {
        data:
          portfolio.length > 0 ? portfolio.map((stock) => stock.amount) : [1],
        backgroundColor:
          portfolio.length > 0
            ? portfolio.map(
                (stock) =>
                  "#" + Math.floor(Math.random() * 16777215).toString(16)
              )
            : ["#CCCCCC"], // Gri renk için
      },
    ],
  };

  return <Pie data={data} />;
};

export default PortfolioChart;
