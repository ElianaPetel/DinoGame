import React, { useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { UserContext } from "../Contexts/UserContext";

export default function PerformanceChart({ datesResults, pointsResults }) {
  const { userCredentials, setUserCredentials } = useContext(UserContext);
  const datesArray = Array.isArray(datesResults) && datesResults.slice(-10);

  const scoresArray = Array.isArray(pointsResults) && pointsResults.slice(-10);
  const labels =
    userCredentials?.results?.length !== 0 && datesResults
      ? datesArray
      : ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My points",
        backgroundColor: "#15eca8",
        borderColor: "#15eca8     ",
        data:
          userCredentials?.results?.length !== 0 && pointsResults
            ? scoresArray
            : "no data scores yet",
      },
    ],
  };
  return <Line data={data} />;
}
