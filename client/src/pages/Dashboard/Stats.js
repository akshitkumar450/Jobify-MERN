import React, { useEffect, useState } from "react";
import { statsService } from "../../services/statsServices";
import { toast } from "react-toastify";
import StatCard from "../../components/StatCard";
function Stats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await statsService.getStats();
        console.log(data.data.stats);
        setStats(data.data.stats);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    getStats();
  }, []);

  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-5 mt-20 px-5">
      {defaultStats.map((stat) => (
        <StatCard stat={stat} />
      ))}
    </div>
  );
}

export default Stats;
