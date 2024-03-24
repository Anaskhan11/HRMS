import React, { useEffect, useRef } from "react";
import { Chart } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EmployeeChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;

      // Assuming your datasets are not dynamically changing.
      // Else, you should recreate the gradients whenever your data changes.
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, "#fc6173"); // Start color
      gradient.addColorStop(1, "#ff902f"); // End color

      // Apply the gradient to the datasets' backgroundColor property
      chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = gradient;
      });

      chart.update(); // Update the chart to reflect the changes
    }
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          borderRadius: 6,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Employee Joins - Leaves Distribution",
        font: {
          size: 14,
        },
        fontColor: "#4E8397",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "#fc6173",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
        categoryPercentage: 1, // Set this back to 1 to occupy full space
      },
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInQuad",
    },
    background: "transparent",
    elements: {
      bar: {
        borderWidth: 1,
        backgroundColor: "#fc6173",
        borderRadius: 50,
      },
    },
    // Set maxBarThickness to create space between bars
    maxBarThickness: 50,
    barPercentage: 0.55, // Adjust the width of individual bars
  };

  const data = {
    labels: ["Joins", "Leaves"],
    datasets: [
      {
        label: "John",
        data: [10, 5],
        backgroundColor: "#fc6173",
        borderColor: "orange",
      },
      {
        label: "Alexa",
        data: [20, 12],
        backgroundColor: "#fc6173",
        borderColor: "#orange",
      },
    ],
  };

  return <Chart ref={chartRef} type="bar" options={options} data={data} />;
}
