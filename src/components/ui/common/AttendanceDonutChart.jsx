import React, { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Employee Attendance",
    },
  },
};

const EmployeeAttendanceDonutChart = ({ attendanceData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;

      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, "#004e92"); // Top color
      gradient.addColorStop(1, "#000428"); // Bottom color

      chart.data.datasets.forEach((dataset) => {
        dataset.backgroundColor = [gradient, "lightgray", "gray"];
      });

      chart.update();
    }
  }, []);

  const data = {
    labels: ["Absents", "Presents", "Leaves"],
    datasets: [
      {
        label: "Attendance",
        data: [
          attendanceData.absents,
          attendanceData.presents,
          attendanceData.leaves,
        ],
      },
    ],
  };

  return <Doughnut ref={chartRef} options={options} data={data} />;
};

export default EmployeeAttendanceDonutChart;
