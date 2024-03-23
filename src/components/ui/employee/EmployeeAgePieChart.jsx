import React, { useEffect, useRef } from "react";
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
  maintainAspectRatio: false,
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

const EmployeeAgeAreaChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;

      const gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        chart.chartArea.bottom
      );
      gradient.addColorStop(0, "#fc6173"); // Top color
      gradient.addColorStop(1, "#ff902f"); // Bottom color

      chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = gradient; // Apply the gradient here
      });

      chart.update();
    }
  }, []);

  const data = {
    labels: ["20-29", "30-39", "40-49", "50-59", "60+"],
    datasets: [
      {
        label: "Age Distribution",
        data: [20, 30, 25, 15, 10],
        fill: true,
        borderColor: "orange",
        // backgroundColor will be set by the useEffect
      },
    ],
  };

  // <Line> instead of <Chart type='line'> for simplicity
  return <Line ref={chartRef} options={options} data={data} />;
};

export default EmployeeAgeAreaChart;
