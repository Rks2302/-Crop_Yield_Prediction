import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Bar, Line, Pie, Chart } from "react-chartjs-2";

function Charts(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ...registerables
  );
  const [chartData, setChartData] = useState(props.chartData);
  return (
    <div>
      <div
        style={{
          paddingTop: "5%",
          height: "100vh",
        }}
      >
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Crop ",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
          
        />
      </div>
    </div>
  );
}

export default Charts;
