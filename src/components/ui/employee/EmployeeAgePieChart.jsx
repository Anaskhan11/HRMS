import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register the required components for a Line chart including the Filler for the area fill
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Add Filler for the area below the line chart
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Employee Demographics - Age Distribution",
    },
  },
  elements: {
    line: {
      tension: 0.4, // Makes the line curved; set to 0 for straight lines
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
      },
      display: true,
      title: {
        display: true,
        text: "Age Range",
      },
    },
    y: {
      grid: {
        drawOnChartArea: false,
      },
      display: true,
      title: {
        display: true,
        text: "Number of Employees",
      },
      beginAtZero: true, // Ensures our chart starts at zero
    },
  },
};

const data = {
  labels: ["20-29", "30-39", "40-49", "50-59", "60+"],
  datasets: [
    {
      label: "Age Distribution",
      data: [20, 30, 25, 15, 10],
      fill: true, // Required for the area under the line to be filled
      backgroundColor: "rgba(83, 51, 237, 0.7)", // Purple with 70% opacity
      borderColor: "rgb(83, 51, 237)",
    },
  ],
};

const EmployeeAgeAreaChart = () => {
  return <Line options={options} data={data} />;
};

export default EmployeeAgeAreaChart;
