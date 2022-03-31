import React from "react";
import Card from "@mui/material/Card";

export default function StatCard({ stat }) {
  return (
    <Card
      className="col-span-1 p-5 border-b-4"
      style={{
        borderColor: stat.color,
      }}
    >
      <p
        className={`text-6xl font-bold `}
        style={{
          color: stat.color,
        }}
      >
        {stat.count}
      </p>
      <p className="text-3xl">{stat.title}</p>
    </Card>
  );
}
