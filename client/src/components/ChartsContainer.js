import React, { useState } from "react";
import AreaChartContainer from "./AreaChart";
import BarChartContainer from "./BarChart";

function ChartsContainer({ monthly }) {
  const [barChart, setBarChart] = useState(true);
  return (
    <div className="text-center">
      <h4>Monthly Applications</h4>

      <button
        className="text-blue-500"
        type="button"
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? "AreaChart" : "BarChart"}
      </button>

      {barChart ? (
        <BarChartContainer monthly={monthly} />
      ) : (
        <AreaChartContainer monthly={monthly} />
      )}
    </div>
  );
}

export default ChartsContainer;
