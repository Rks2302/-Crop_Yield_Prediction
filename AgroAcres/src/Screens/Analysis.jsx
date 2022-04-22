import React, { useState, useEffect } from "react";
import Chart from "../Components/Charts";
import axios from "axios";

function Analysis() {
  
  useEffect(() =>{
    axios.get("http://127.0.0.1:5000/analysis")
    .then(({ data }) => {
        console.log(data.prediction[0]);

        localStorage.setItem("chart", JSON.stringify(data));
      })
      .catch((err) => {});
  },[])

  const [chartData, setChartData] = useState({
    labels: JSON.parse(localStorage.getItem("chart")).prediction[0],
    datasets: [
      {
        label: "Maize",
        data: JSON.parse(localStorage.getItem("chart")).prediction[1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });
  return (
    <div>
      <Chart chartData={chartData} />
    </div>
  );
}
export default Analysis;
