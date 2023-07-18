import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu",
      },
    },
  };

  const labels = [
    "Q1",
    "Q2",
    "Q3",
    "Q4",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Nam",
        data: labels.map(() => Math.random() * 100),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Nữ",
        data: labels.map(() => Math.random() * 100),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default BarChart;
